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

create or replace function make_new_fake_value(value text)
returns text
language plpgsql
as $$
begin
  return case
    when value ~ '^\d+$' then (value::int + 1)::text
    when length(value) > 1 then reverse(value)
    else concat(value, value)
  end;
end
$$;
