-- PostgreSQL Canvas: Database Analysis Template
-- A collection of useful queries for examining your PostgreSQL database

-- List all schemas in the database
SELECT 
    nspname AS schema_name,
    pg_catalog.pg_get_userbyid(nspowner) AS schema_owner
FROM pg_catalog.pg_namespace
WHERE nspname !~ '^pg_' AND nspname != 'information_schema'
ORDER BY schema_name;

-- List all tables with their sizes and row estimates
SELECT
    schemaname AS schema_name,
    relname AS table_name,
    pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
    pg_size_pretty(pg_relation_size(relid)) AS data_size,
    pg_stat_get_live_tuples(relid) AS row_estimate
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;
