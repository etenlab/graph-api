create or replace procedure add_random_votes(
  in p_table_name text,
  in p_ids bigint[]
)
language plpgsql
as $$
declare
  v_id bigint;
  v_random_num int;
  v_series record;
begin
  foreach v_id in array p_ids loop
    v_random_num := floor(random() * 20)::int + 2;

    for v_series in
      select * from generate_series(1, v_random_num)
    loop
      call add_vote(
        p_table_name,
        v_id,
        floor(random() * 2)::int::bool
      );
    end loop;
  end loop;
end;
$$;
