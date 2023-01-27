create or replace procedure add_post(
  in p_table_name text,
  in p_row bigint,
  in p_plain_text text
)
language plpgsql
as $$
declare
  v_discussion_id bigint;
begin
  select id
  from admin.discussions
  where table_name=p_table_name and row=p_row
  into v_discussion_id;
  
  if v_discussion_id is null then
    insert into admin.discussions (table_name, row)
    values (p_table_name, p_row)
    returning id
    into v_discussion_id;
  end if;

  insert into admin.posts (discussion_id, plain_text)
  values (v_discussion_id, p_plain_text);
end;
$$;
