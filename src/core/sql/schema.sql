create table node_types (
  type_name varchar(32) primary key
);

create table nodes (
  node_id bigserial primary key,
  node_type varchar(32) references node_types(type_name)
);

create table node_property_keys (
  node_property_key_id bigserial primary key,
  node_id bigint references nodes(node_id) not null,
  property_key varchar(64)
);

create table node_property_values (
  node_property_value_id bigserial primary key,
  node_property_key_id bigint references node_property_keys(node_property_key_id) not null,
  property_value jsonb
);

create table relationship_types (
  type_name varchar(32) primary key
);

create table relationships (
  relationship_id bigserial primary key,
  relationship_type varchar(32) references relationship_types(type_name),
  from_node_id bigint references nodes(node_id),
  to_node_id bigint references nodes(node_id)
);

create table relationship_property_keys (
  relationship_property_key_id bigserial primary key,
  relationship_id bigint references relationships(relationship_id) not null,
  property_key varchar(64)
);

create table relationship_property_values (
  relationship_property_value_id bigserial primary key,
  relationship_property_key_id bigint references relationship_property_keys(relationship_property_key_id) not null,
  property_value jsonb
);

insert into node_types (type_name) values
  ('word'),
  ('word-sequence'),
  ('verse'),
  ('chapter'),
  ('book'),
  ('bible'),
  ('definition'),
  ('article'),
  ('lexical-entry');

insert into relationship_types (type_name) values
  ('word-sequence-to-word'),
  ('verse-to-word-sequence'),
  ('chapter-to-verse'),
  ('book-to-chapter'),
  ('bible-to-book'),
  ('word-to-article');
