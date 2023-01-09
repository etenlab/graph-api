create or replace procedure graph_create_chapter(
  inout p_chapter_id bigint,
  in p_node_properties json default '{}',
  in p_rel_properties json default '{}',
  in p_verses json default '[]'
)
language plpgsql
as $$
declare
  v_sequences text[];
  v_sequence text;
  v_counter int := 0;
  v_verse_id bigint;
begin
  call graph_add_node('chapter', p_chapter_id, p_node_properties);

  v_sequences := (
    select coalesce(array_agg(text), array[]::text[])
    from json_array_elements_text(p_verses) as text
  );

  foreach v_sequence in array v_sequences loop
    v_counter := v_counter + 1;

    call graph_create_verse(
      v_verse_id,
      json_build_object('number', json_build_object('value', v_counter)),
      json_build_object('position', json_build_object('value', v_counter)),
      v_sequence
    );

    call graph_add_relationship(
      'chapter-to-verse',
      p_chapter_id,
      v_verse_id,
      (
        p_rel_properties::jsonb ||
        json_build_object(
          'position',
          json_build_object('value', v_counter)
        )::jsonb
      )::json
    );
  end loop;
end;
$$;
