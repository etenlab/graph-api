create or replace procedure graph_add_node(
  in p_node_type text,
  inout p_node_id bigint,
  in p_properties json default '{}'
)
language plpgsql
as $$
declare
  v_keys text[];
  v_key text;
  v_node_property_key_id bigint;
begin
  insert into nodes (node_type) 
  values (p_node_type)
  returning node_id
  into p_node_id;

  v_keys := coalesce(
    (select array_agg(key) from json_object_keys(p_properties) as key),
    array[]::text[]
  );

  if cardinality(v_keys) > 0 then
    foreach v_key in array v_keys loop
      insert into node_property_keys (node_id, property_key)
      values (p_node_id, v_key)
      returning node_property_key_id
      into v_node_property_key_id;

      insert into node_property_values (node_property_key_id, property_value)
      values (v_node_property_key_id, p_properties->v_key);
    end loop;
  end if;
end;
$$;
