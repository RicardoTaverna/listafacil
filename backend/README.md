# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Para subir o projeto backend é necessário ter instalado o Docker e o Docker Compose

```bash
docker-compose up --build
```


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

## Endpoints

Abaixo estão listados todos os endpoints funcionais do projeto

### User

* Adicionar usuário:
    [POST] /user/add
    ```json
    {
        "username": "exemplo",
        "email": "exemplo@exemplo.com",
        "password": "exemplo"
    }
    ```
* Listar usuários:
    [GET] /user/all
    [GET] /user/find/:id

* Atualizar usuários:
    [PUT] /user/update
    ```json
    {
        "username": "exemplo",
        "email": "exemplo@exemplo.com"
    }
    ```

* Deletar usuário:
    [DELETE] /user/delete/:id
