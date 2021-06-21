<h1 align="center">
    <img alt="Lista Fáccil" title="Lista Fáccil" src="images\ListaFácil_removebg.png" width="50%"/>
    
</h1>
<h2 align="center">Lista Fácil</h2>

<p align="center">Aplicação para montar lista de compras, utilizando valores reais disponibilizados pelo notaparaná.</p>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/RicardoTaverna/listafacil?color=%2349C7AB&style=for-the-badge">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/RicardoTaverna/listafacil?style=for-the-badge">
  
  <a href="https://github.com/RicardoTaverna/listafacil/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/RicardoTaverna/listafacil?color=%2349C7AB&style=for-the-badge">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?color=%2349C7AB&style=for-the-badge">
   <a href="https://github.com/RicardoTaverna/listafacil/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/RicardoTaverna/listafacil?style=for-the-badge">
  </a>

  <img alt="Repository Issues" src="https://img.shields.io/github/issues/RicardoTaverna/listafacil?color=%2349C7AB&style=for-the-badge">
</p>


## 💻 Tabela de conteúdos


* [Sobre](#Sobre)
* [Tabela de Conteudo](#tabela-de-conteudo)
* [Tecnologias](#tecnologias)
* [Executar projeto](#executar-projeto)
    * [Pré-requisitos](#pré-requisitos)
    * [Execução](#execução)
        * [Executar Backend](#Executar-Backend)
* [Endpoints](#endpoints)


## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- <a href="https://www.djangoproject.com">
    <img alt="Adonis" src="https://img.shields.io/badge/AdonisJS-v4.1-49C7AB?style=for-the-badge">
</a>

- <a href="https://nodejs.org/">
    <img alt="Python" src="https://img.shields.io/badge/Node-v14.16-49C7AB?style=for-the-badge">
</a>

- <a href="https://www.npmjs.com">
    <img alt="Python" src="https://img.shields.io/badge/Npm-v6.14-49C7AB?style=for-the-badge">
</a>

- <a href="https://www.docker.com">
    <img alt="Docker Compose" src="https://img.shields.io/badge/Docker_Compose-v1.28.5-49C7AB?style=for-the-badge">
</a>

- <a href="https://www.docker.com">
    <img alt="Docker" src="https://img.shields.io/badge/Docker-v20.10-49C7AB?style=for-the-badge">
</a>

- <a href="https://www.mysql.com">
    <img alt="Mysql" src="https://img.shields.io/badge/MySQL-v8.0.21-49C7AB?style=for-the-badge">
</a>


## 🚀 Executar projeto

Para executar esse pojeto você precisa de alguns pré-requisitos:

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node](https://nodejs.org/) e [Docker](https://www.docker.com). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

### Execução
```bash
# clonar o repositório 
$ git clone https://github.com/RicardoTaverna/django_file_integration.git
```
#### Executar Backend
```bash

# Acessar a pasta /backend
$ cd backend/

# inicializar docker
$ docker-compose up --build

# o servidor web iniciará 0.0.0.0:3333
# o banco de dados iniciara 0.0.0.0:3060
```

## Endpoints
A documentação no padrão OpenAPI você encontra [aqui](/backend/docs/documentation.yml)