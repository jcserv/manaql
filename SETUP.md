1. Clone both repos
2. Run fly launch from manaql-ingest/, with a Postgres db
3. Set the environment variables in the fly UI
4. Run fly deploy
5. Run fly launch from manaql/
6. Set the environment variables in the fly UI
7. Run fly deploy
8. Run fly postgres attach -a <POSTGRES-DB-NAME> --database-name <MANAQL-INGEST-APP-NAME>
9. Run fly deploy again to update the environment variables