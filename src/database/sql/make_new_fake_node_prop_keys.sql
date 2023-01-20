create or replace procedure make_new_fake_node_prop_keys()
language plpgsql
as $$
declare
  v_keys json[];
  v_key json;
  v_key_id bigint;
  v_values json[];
  v_value json;
begin
  v_keys := (
    select coalesce(array_agg(t), array[]::json[])
    from json_array_elements(
      (
        select json_agg(t.*)
        from (
          select
            npk.node_id as relation_id,
            npk.property_key as key,
            json_agg(npv.property_value) as values
          from node_property_keys npk
          left join node_property_values npv
            on npv.node_property_key_id=npk.node_property_key_id
          group by npk.node_id, npk.property_key
        ) t
      )
    ) as t
  );

  foreach v_key in array v_keys loop
    insert into node_property_keys (node_id, property_key)
    values (
      (v_key->'relation_id')::text::bigint,
      make_new_fake_value(v_key->>'key'::text)
    )
    returning node_property_key_id
    into v_key_id;

    v_values := (
      select coalesce(array_agg(t), array[]::json[])
      from json_array_elements(v_key->'values') as t
    );

    foreach v_value in array v_values loop
      insert into node_property_values (node_property_key_id, property_value)
      values (
        v_key_id,
        json_build_object('value', make_new_fake_value(v_value->>'value'))
      );
    end loop;
  end loop;
end;
$$;
