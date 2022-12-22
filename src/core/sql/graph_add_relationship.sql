create or replace procedure graph_add_relationship(
  in p_relationship_type text,
  in p_from_node_id bigint,
  in p_to_node_id bigint,
  in p_properties json default '{}'
)
language plpgsql
as $$
declare
  v_keys text[];
  v_key text;
  v_rel_id bigint;
  v_rel_property_key_id bigint;
begin
  v_keys := coalesce(
    (select array_agg(key) from json_object_keys(p_properties) as key),
    array[]::text[]
  );

  insert into relationships (relationship_type, from_node_id, to_node_id) 
  values (p_relationship_type, p_from_node_id, p_to_node_id)
  returning relationship_id
  into v_rel_id;

  if cardinality(v_keys) > 0 then
    foreach v_key in array v_keys loop
      insert into relationship_property_keys (relationship_id, property_key)
      values (v_rel_id, v_key)
      returning relationship_property_key_id
      into v_rel_property_key_id;

      insert into relationship_property_values (
        relationship_property_key_id,
        property_value
      )
      values (v_rel_property_key_id, p_properties->v_key);
    end loop;
  end if;
end;
$$;
