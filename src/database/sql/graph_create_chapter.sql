create or replace procedure graph_create_chapter(
  inout p_chapter_id bigint,
  in p_node_properties json default '{}',
  in p_rel_properties json default '{}',
  in p_verses json default '[]'
)
language plpgsql
as $$
declare
  v_verses json[];
  v_verse json;
  v_counter int := 0;
  v_verse_id bigint;
begin
  call graph_add_node('chapter', p_chapter_id, p_node_properties);

  v_verses := (
    select coalesce(array_agg(verse), array[]::json[])
    from json_array_elements(p_verses) as verse
  );

  foreach v_verse in array v_verses loop
    v_counter := v_counter + 1;

    call graph_create_verse(
      v_verse_id,
      (
        (v_verse->'properties')::jsonb ||
        json_build_object('position', v_counter)::jsonb
      )::json,
      json_build_object('position', v_counter),
      v_verse->>'text'
    );

    call graph_add_relationship(
      'chapter-to-verse',
      p_chapter_id,
      v_verse_id,
      (
        p_rel_properties::jsonb ||
        json_build_object('position', v_counter)::jsonb
      )::json
    );
  end loop;
end;
$$;
