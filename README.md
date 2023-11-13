# Pacientes APIRest

- [Pacientes APIRest](#pacientes-apirest)
  - [Apresentation](#apresentation)
    - [Backend para aplicação WEB de gestão de entradas de pacientes em um hospital](#backend-para-aplicação-web-de-gestão-de-entradas-de-pacientes-em-um-hospital)
  - [Features](#features)
  - [SQL Infos](#sql-infos)
    - [Tabelas](#tabelas)
  - [Primeiros passos](#primeiros-passos)
    - [Clonar repositório do github](#clonar-repositório-do-github)
    - [Variáveis de ambiente](#variáveis-de-ambiente)
    - [Iniciando a aplicação](#iniciando-a-aplicação)
  - [Testes](#testes)
  - [Validação de dados](#validação-de-dados)
  - [Paths](#paths)
    - ["/patient"](#patient)
      - [post](#post)
      - [put](#put)
      - [get (many)](#get-many)
      - [get (one)](#get-one)
      - [delete](#delete)

## Apresentation

### Backend para aplicação WEB de gestão de entradas de pacientes em um hospital

- Desenvolvida em NodeJS v16.15.1, Express v4.18.2 e Typescript v5.2.2;
- Banco de dados construido com TypeORM;
- Rodando com SQLite3;
- Testes com Jest v29.7.0;

## Features

- Criação, edição, remoção, visualização e lista de pacientes;

## SQL Infos

### Tabelas

- patients: Armazena a informação dos pacientes com as colunas:
  - id:integer;
  - name:string;
  - telephone:number;
  - gender:boolean;
  - dateOfBirth:string;
  - wing:string;
  - room:number;
  - created_at:datetime;
  - updated_at:datetime;

## Primeiros passos

### Clonar repositório do github

[Diretório Github: Unimed_test](https://github.com/pedromsra/Unimed_test)

### Variáveis de ambiente

- Criar arquivo .env, no root da aplicação, exatamente igual ao arquivo sample.env, com as seguintes variáveis:
  - PORT=3004 (ou a de sua preferência);

### Iniciando a aplicação

- Abrir terminal e digitar:
  - `$ cd /local_da_pasta_onde_a_API_está_salva;`
  - `$ npm run migrate:generate`
  - `$ npm run migrate:run`
  - `$ npm install`
  - `$ npm run dev`

> Para os fins dessa documentação será considerado o servidor local de enderço localhost:3004;
> Para alterar o servidor recomenda-se alterar no arquivo .env em PORT;

## Testes

- Foram desenvolvidos testes para todos os métodos desenvolvidos nesta aplicação;
- O banco de dados para os testes foi 'mockado' em memória e limpo para cada teste, não havendo interferência entre testes;
  - Os metodos de manipulação de dados estão no arquivo `/src/repositories/PatientRepositoryInMemory.ts`;
- As funcionalidades testadas foram:
  - Registro de novo paciente (create);
  - Atualização do paciente (update);
  - Lista de pacientes (index);
  - Visualização de paciente (show);
  - Remoção de paciente (delete);
- Tambpem foram testadas as [validações de dados](#validação-de-dados) (se o paciente já existe, se o quarto existe, se a ala existe, etc...)
- Os arquivos de testes têm extensão .spec.ts e estão todos na pasta `/src/services`
- Para executar os testes, uma vez estando na raiz do projeto, digitar no terminal: `npm run test`

## Validação de dados

- name: não é permitido mais de um paciente com mesmo nome (usou-se essa restrição para nome, mas poderia ser para cpf, email, etc...);
- dateOfBirth: a data de nascimento informada deve ser no formado DD/MM/AAAA;
- gender: o gênero informado deve ser 'masculino' ou 'feminino';
- wing: a ala informada deve ser 'A' ou 'B';
- room: o quarto informado deve ser 1, 2, 3, 4, 5, 6, 7, 8 ou 9;
- Na criação/cadastro do paciente, todos os campos são obrigatórios: name, telephone, dateOfBirth, gender, wing e room;

## Paths

### "/patient"

#### post

- endereço: localhost:3004/patient;
- info: Adicionar um novo paciente;
- Body da equisição esperado em JSON (exemplo):

    {
        "name": "Pedro de Araújo",
        "telephone": "5584981015334",
        "dateOfBirth": "08/04/1995",
        "gender": "masculino",
        "wing": "A",
        "room": 2
    }

- response: status(201);

#### put

- endereço: localhost:3004/patient/:id;
- info: modifica as informações do paciente informado;
- Body da equisição esperado em JSON (exemplo):

    {
        "name": "Pedro Mauricio Saboia Rodrigues de Araujo Fernandes",
        "telephone": "5584981015334",
        "dateOfBirth": "08/04/1995",
        "gender": "masculino",
        "wing": "A",
        "room": 9
    }

- response: status(200);

> Não é obrigatório informar todos os dados, como acima, pode-se atualizar apenas o quarto (room), por exemplo

#### get (many)

- endereço: localhost:3004/patient;
- info: retorna uma lista de pacientes de acordo com:
  - name: Nome (ou parte do nome) informado;
  - room: Quarto informado;
  - wing: Ala informada;
  - gender: Gênero informado;
  - room and wing: Quarta e Ala informada;
  - Todos os pacientes (nenhum valor informado);
- Body da equisição esperado em JSON (exemplo):

        {
            "name":"Eva"
        }

- response:

    {
        "patientIndex": [
            {
                "id": 15,
                "name": "Eva Beatriz",
                "telephone": "5584981015334",
                "dateOfBirth": "08/04/1995",
                "gender": "masculino",
                "wing": "B",
                "room": 1,
                "CREATED_AT": "2023-11-13T00:14:11.010Z",
                "UPDATED_AT": "2023-11-13T00:14:11.010Z"
            },
            {
                "id": 16,
                "name": "Eva Beatriz Ferreira",
                "telephone": "5584981015334",
                "dateOfBirth": "08/04/1995",
                "gender": "masculino",
                "wing": "A",
                "room": 1,
                "CREATED_AT": "2023-11-13T00:14:11.010Z",
                "UPDATED_AT": "2023-11-13T00:14:11.010Z"
            },
            {
                "id": 17,
                "name": "Eva Beatriz Ferreira de Araujo",
                "telephone": "5584981015334",
                "dateOfBirth": "08/04/1995",
                "gender": "masculino",
                "wing": "A",
                "room": 2,
                "CREATED_AT": "2023-11-13T00:14:11.010Z",
                "UPDATED_AT": "2023-11-13T00:14:11.010Z"
            }
        ]
    }

#### get (one)

- endereço: localhost:3004/patient/:id;
- info: retorna as informações do paciente de id informado;

- para <http://localhost:3004/patient/15>, response:

    {
        "id": 15,
        "name": "Eva Beatriz",
        "telephone": "5584981015334",
        "dateOfBirth": "08/04/1995",
        "gender": "masculino",
        "wing": "B",
        "room": 1,
        "CREATED_AT": "2023-11-13T00:14:11.010Z",
        "UPDATED_AT": "2023-11-13T00:14:11.010Z"
    }

#### delete

- endereço: localhost:3004/patient/:id;
- info: remove o paciente de id informado;
- response: status(201);
