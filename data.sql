\echo 'Delete and recreate phoenixdb db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE phoenixdb;

CREATE DATABASE phoenixdb;

\connect phoenixdb;

\i phoenixdb-schema.sql

\echo 'Delete and recreate phoenixdb_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE phoenixdb_test;
CREATE DATABASE phoenixdb_test;
\connect phoenixdb_test

\i phoenixdb-schema.sql