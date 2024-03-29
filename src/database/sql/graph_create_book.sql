create or replace procedure graph_create_book(
  inout p_book_id bigint,
  in p_node_properties json default '{}',
  in p_rel_properties json default '{}',
  in p_chapters json default '[]'
)
language plpgsql
as $$
declare
  v_chapters json[];
  v_chapter json;
  v_counter int := 0;
  v_chapter_id bigint;
begin
  call graph_add_node('book', p_book_id, p_node_properties);

  v_chapters := (
    select coalesce(array_agg(chapter), array[]::json[])
    from json_array_elements(p_chapters) as chapter
  );

  foreach v_chapter in array v_chapters loop
    v_counter := v_counter + 1;

    call graph_create_chapter(
      v_chapter_id,
      (
        (v_chapter->'properties')::jsonb ||
        json_build_object('position', v_counter)::jsonb
      )::json,
      json_build_object(),
      coalesce(v_chapter->'verses', json_build_array())
    );

    call graph_add_relationship(
      'book-to-chapter',
      p_book_id,
      v_chapter_id,
      (
        p_rel_properties::jsonb ||
        json_build_object('position', v_counter)::jsonb
      )::json
    );
  end loop;
end;
$$;
