create or replace procedure graph_delete_all()
language plpgsql
as $$
begin
	delete from relationship_property_values;
	delete from relationship_property_keys;
	delete from relationships;
	delete from node_property_values;
	delete from node_property_keys;
	delete from nodes;
end;
$$;

create or replace procedure graph_reset_all()
language plpgsql
as $$
begin
	truncate table nodes restart identity cascade;
end;
$$;

create or replace procedure graph_create_or_read_word_of(p_word varchar(32))
language plpgsql
as $$
declare
	v_word_id bigint;
begin
	call graph_create_or_read_word(p_word, v_word_id);
end;
$$;

create or replace procedure graph_create_word_sequence_of(p_sequence text)
language plpgsql
as $$
declare
	p_word_sequence_id bigint;
begin
	call graph_create_word_sequence(p_sequence, p_word_sequence_id);
end;
$$;

create or replace procedure graph_create_or_read_word_sequence_of(p_sequence text)
language plpgsql
as $$
declare
	p_word_sequence_id bigint;
begin
	call graph_create_or_read_word_sequence(p_sequence, p_word_sequence_id);
end;
$$;
