create or replace procedure add_vote(
  in p_table_name text,
  in p_row bigint,
  in p_up bool
)
language plpgsql
as $$
declare
  v_votable text;
  v_ballot_entry_id bigint;
begin
  select table_name
  from votables
  where table_name=p_table_name
  into v_votable;
  
  if v_votable is null then
    insert into votables (table_name)
    values (p_table_name);
  end if;
  
  select id
  from admin.ballot_entries
  where table_name=p_table_name and row=p_row
  into v_ballot_entry_id;
  
  if v_ballot_entry_id is null then
    insert into admin.ballot_entries (table_name, row)
    values (p_table_name, p_row)
    returning id
    into v_ballot_entry_id;
  end if;
  
  insert into admin.votes (ballot_entry_id, up)
  values (v_ballot_entry_id, p_up);
end;
$$;
