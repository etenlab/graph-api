create or replace procedure seed_dev_data(in p_bible json)
language plpgsql
as $$
declare
  v_bible_id bigint;
begin
  call graph_reset_all();
  delete from admin.votes;
  delete from admin.ballot_entries;
  delete from admin.posts;
  delete from admin.discussions;
  delete from votables;

  call graph_create_bible(
    v_bible_id,
    p_bible->'properties',
    json_build_object(),
    p_bible->'books'
  );

  insert into node_property_values (node_property_key_id, property_value)
  select
    node_property_key_id,
    json_build_object(
      'value',
      make_new_fake_value(property_value->>'value')
    ) as property_value
  from node_property_values;

  insert into relationship_property_values (
    relationship_property_key_id,
    property_value
  )
  select
    relationship_property_key_id,
    json_build_object(
      'value',
      make_new_fake_value(property_value->>'value')
    ) as property_value
  from relationship_property_values;

  call make_new_fake_node_prop_keys();
  call make_new_fake_rel_prop_keys();

  do $_$
  declare
    v_node_key_ids bigint[];
    v_node_value_ids bigint[];
    v_rel_key_ids bigint[];
    v_rel_value_ids bigint[];
  begin
    select array_agg(node_property_key_id)
    from node_property_keys
    into v_node_key_ids;

    select array_agg(node_property_value_id)
    from node_property_values
    into v_node_value_ids;

    select array_agg(relationship_property_key_id)
    from relationship_property_keys
    into v_rel_key_ids;

    select array_agg(relationship_property_value_id)
    from relationship_property_values
    into v_rel_value_ids;

    call add_random_votes('node_property_keys', v_node_key_ids);
    call add_random_votes('node_property_values', v_node_value_ids);
    call add_random_votes('relationship_property_keys', v_rel_key_ids);
    call add_random_votes('relationship_property_values', v_rel_value_ids);

    call add_random_posts('node_property_keys', v_node_key_ids);
    call add_random_posts('node_property_values', v_node_value_ids);
    call add_random_posts('relationship_property_keys', v_rel_key_ids);
    call add_random_posts('relationship_property_values', v_rel_value_ids);
  end
  $_$;
end;
$$;
