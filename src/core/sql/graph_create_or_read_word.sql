create or replace procedure graph_create_or_read_word(
  in p_word varchar(32),
  inout p_word_id bigint
)
language plpgsql
as $$
declare
  v_node_property_key_id bigint;
begin

  select nodes.node_id
  from nodes
  join node_property_keys 
    on nodes.node_id = node_property_keys.node_id
  join node_property_values 
    on node_property_keys.node_property_key_id = node_property_values.node_property_key_id
  where nodes.node_type = 'word'
    and node_property_values.property_value->>'value' = p_word
  into p_word_id;

  if found then
    return;
  else    

    insert into nodes (node_type) 
    values ('word')
    returning node_id
    into p_word_id;

    insert into node_property_keys (node_id, property_key)
    values (p_word_id, 'word_name')
    returning node_property_key_id
    into v_node_property_key_id;

    insert into node_property_values (node_property_key_id, property_value)
    values (v_node_property_key_id, ('{"value":"' || p_word || '"}')::json);

  end if;

end; $$;

