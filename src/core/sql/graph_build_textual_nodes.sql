create or replace function graph_build_textual_nodes()
returns table(
  id bigint,
  type varchar(32),
  properties jsonb,
  rel_types_to_nodes json,
  relationships json,
  value text
)
language sql
as $$
  with doc_nodes as (
    select
      n.node_id as id,
      n.node_type as type,
      coalesce(
        jsonb_object_agg(npk.property_key, npv.property_value->'value')
        filter (where npk is not null),
        '{}'
      ) as properties,
      coalesce(
        (
          select json_object_agg(grouped.key, grouped.values) as merged
          from (
            select rows.key, json_agg(rows.value) as values
            from (
              select *
              from json_each((
                select coalesce(
                  json_object_agg(rels.relationship_type, rels.to_node_id),
                  '{}'
                )
                from (
                  select
                    rels.value->>'relationship_type' as relationship_type,
                    rels.value->'to_node_id' as to_node_id
                  from jsonb_array_elements(
                    coalesce(
                      jsonb_agg(
                        jsonb_build_object(
                          'relationship_id',
                          r.relationship_id,
                          'relationship_type',
                          r.relationship_type,
                          'to_node_id',
                          r.to_node_id,
                          'properties',
                          jsonb_build_object(
                            rpk.property_key,
                            rpv.property_value->'value'
                          )
                        )
                      )
                      filter (where r is not null),
                      '[]'
                    )
                  ) as rels
                  order by rels.value->'properties'->'position' asc
                ) as rels
              ))
            ) as rows
            group by rows.key
          ) as grouped
        ),
        '{}'
      ) as rel_types_to_nodes,
    (
      select coalesce(
        json_agg(
          rels.value
          order by rels.value->'properties'->'position' asc
        ),
        '[]'
      )
      from jsonb_array_elements(
        coalesce(
          jsonb_agg(
            jsonb_build_object(
              'relationship_id',
              r.relationship_id,
              'relationship_type',
              r.relationship_type,
              'to_node_id',
              r.to_node_id,
              'properties',
              jsonb_build_object(
                rpk.property_key,
                rpv.property_value->'value'
              )
            )
          )
          filter (where r is not null),
          '[]'
        )
      ) as rels
    ) as relationships
    from nodes as n
    left join node_property_keys as npk on n.node_id=npk.node_id
    left join node_property_values as npv on npk.node_property_key_id=npv.node_property_key_id
    left join relationships as r on r.from_node_id=n.node_id
    left join relationship_property_keys as rpk on rpk.relationship_id=r.relationship_id
    left join relationship_property_values as rpv on rpv.relationship_property_key_id=rpk.relationship_property_key_id
    group by n.node_id, n.node_type
  )

  select
    dn.*,
    case dn.type
      when 'word' then dn.properties->>'word_name'
      when 'word-sequence' then (
        select string_agg(words.value::text, ' ') as words
        from (
          select npv.property_value->>'value' as value
          from (
            select row_number() over() - 1 as index, *
            from (
              select json_array_elements(
                dn.rel_types_to_nodes->'word-sequence-to-word'
              )::text::int as value
            ) as unindexed_node_ids
          ) as node_ids
          join nodes as n on n.node_id=value and n.node_type='word'
          join node_property_keys as npk on n.node_id=npk.node_id and npk.property_key='word_name'
          join node_property_values as npv on npk.node_property_key_id=npv.node_property_key_id
          order by node_ids.index asc
        ) as words
      )
      else '-'
    end as value
  from doc_nodes as dn
$$;
