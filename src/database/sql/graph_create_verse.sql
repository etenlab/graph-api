create or replace procedure graph_create_verse(
  inout p_verse_id bigint,
  in p_node_properties json default '{}',
  in p_rel_properties json default '{}',
  in p_sequence text default ''
)
language plpgsql
as $$
declare
  p_word_sequence_id bigint;
begin
  call graph_add_node('verse', p_verse_id, p_node_properties);

  call graph_create_or_read_word_sequence(p_sequence, p_word_sequence_id);

  call graph_add_relationship(
    'verse-to-word-sequence',
    p_verse_id,
    p_word_sequence_id,
    p_rel_properties
  );
end;
$$;
