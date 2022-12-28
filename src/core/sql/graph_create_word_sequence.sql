create or replace procedure graph_create_word_sequence(
  in p_sequence text,
  inout p_word_sequence_id bigint
)
language plpgsql
as $$
declare
  v_counter int := 0;
  s text;
  v_word_id bigint;
  v_rel_id bigint;
  v_rel_property_key_id bigint;
begin

  call graph_add_node('word-sequence', p_word_sequence_id);

  foreach s in array string_to_array(p_sequence, chr(32)) loop
    v_counter := v_counter + 1;
    raise notice '%', s;

    call graph_create_or_read_word(s, v_word_id);

    raise notice '%', v_word_id;

    call graph_add_relationship(
      'word-sequence-to-word',
      p_word_sequence_id,
      v_word_id,
      json_build_object('position', json_build_object('value', v_counter))
    );

  end loop;

end; $$;