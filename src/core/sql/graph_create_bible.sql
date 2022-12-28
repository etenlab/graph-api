create or replace procedure graph_create_bible(
  inout p_bible_id bigint,
  in p_node_properties json default '{}',
  in p_rel_properties json default '{}',
  in p_books json default '[]'
)
language plpgsql
as $$
declare
  v_books json[];
  v_book json;
  v_counter int := 0;
  v_book_id bigint;
begin
  call graph_add_node('bible', p_bible_id, p_node_properties);

  v_books := (
    select coalesce(array_agg(book), array[]::json[])
    from json_array_elements(p_books) as book
  );

  foreach v_book in array v_books loop
    v_counter := v_counter + 1;

    call graph_create_book(
      v_book_id,
      coalesce(v_book->'properties', json_build_object()),
      json_build_object(),
      coalesce(v_book->'chapters', json_build_array())
    );

    call graph_add_relationship(
      'bible-to-book',
      p_bible_id,
      v_book_id,
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
