create or replace procedure graph_create_or_read_word_sequence(
  in p_sequence text,
  inout p_word_sequence_id bigint
)
language plpgsql
as $$
declare
  v_words text[];
  v_words_length int := 0;
  v_found_nodes_length int := 0;
  v_found_nodes_ids bigint[];
  v_sequence_node_id bigint;
begin
  v_words := string_to_array(p_sequence, chr(32));
  v_words_length := coalesce(array_length(v_words, 1), 0);

  with found_nodes as (
    select n.*
    from (
      select row_number() over() - 1 as index, *
      from (
        select unnest(v_words) as value
      ) as unindexed_words
    ) as indexed_words
    join nodes as n on n.node_type='word'
    join node_property_keys as npk on n.node_id=npk.node_id
    join node_property_values as npv
      on npk.node_property_key_id=npv.node_property_key_id
      and npv.property_value->>'value'=indexed_words.value
    order by indexed_words.index asc
  )

  select count(*), array_agg(node_id)
  from found_nodes
  into v_found_nodes_length, v_found_nodes_ids;
  
  raise notice 'Words array length: %', v_words_length;
  raise notice 'Found nodes length: %', v_found_nodes_length;
  raise notice 'Found node ids: %', v_found_nodes_ids;
  
  if v_words_length = v_found_nodes_length then
    raise notice 'All words exist';

    with found_sequence as (
      select *
      from (
        select n.node_id, json_agg(r.to_node_id) as to_node_ids
        from nodes as n
        join relationships as r
          on r.relationship_type='word-sequence-to-word'
          and r.from_node_id=n.node_id
        where n.node_type='word-sequence'
        group by n.node_id
      ) as ids
      where ids.to_node_ids::text = array_to_json(v_found_nodes_ids)::jsonb::text
      limit 1
    )

    select node_id from found_sequence into v_sequence_node_id;
    
    if found then
      raise notice 'Found sequence node id: %', v_sequence_node_id;
      return;
    end if;
  else
    raise notice 'Words should be inserted';
  end if;
  
  raise notice 'Sequence should be inserted';
  
  call graph_create_word_sequence(p_sequence, p_word_sequence_id);
end;
$$;
