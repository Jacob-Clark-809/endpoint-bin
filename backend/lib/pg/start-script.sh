# run with `bash filename`

createdb endpoint-bin
psql -d endpoint-bin < schema.sql
# psql -d endpoint-bin < seed-data.sql
