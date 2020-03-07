
# Posgres Test

```
sudo docker run -d \
    --name postgres-tests \
    -e POSTGRES_USER=cliente1 \
    -e POSTGRES_PASSWORD=123 \
    -e POSTGRES_DB=tests \
    -p 5432:5432 \
    postgres:11.5
```

```
postgres://cliente1:123@localhost:5432/tests
```

```
sudo docker exec -ti postgres-tests psql -d tests -U cliente1 -W
```

# Sequelize Migrations

```
npx sequelize migration:create --name name-the-migration

npx sequelize db:migrate

npx sequelize db:migrate:undo
```
