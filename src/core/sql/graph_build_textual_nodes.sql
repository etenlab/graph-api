create or replace function graph_build_textual_nodes()
returns table(id bigint, type varchar(32), properties jsonb, relationships json, value text)
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
              from json_each(
                coalesce(
                  json_object_agg(r.relationship_type, r.to_node_id)
                  filter (where r is not null),
                  '{}'
                )
              )
            ) as rows
            group by rows.key
          ) as grouped
        ),
        '{}'
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
                dn.relationships->'word-sequence-to-word'
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
