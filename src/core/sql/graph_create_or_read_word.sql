create or replace procedure graph_create_or_read_word(
  in p_word varchar(32),
  inout p_word_id bigint
)
language plpgsql
as $$
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
  end if;

  call graph_add_node(
    'word',
    p_word_id,
    ('{"word_name": {"value": "' || p_word || '"}}')::json
  );

end; $$;
