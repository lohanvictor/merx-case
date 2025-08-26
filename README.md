# Case para MerxTech

Este projeto é a implementação de um case para um processo seletivo para Desenvolvedor Front-End JR na Merx Tech.

## Bibliotecas

O repositório foi iniciado com o comando padrão para iniciar um projeto NextJS.

```commandline
npx create-next-app @latest case-merxtech
```

Além das bibliotecas padrões de instalação, como React, Next e TailwindCSS, foram instaladas bibliotecas externas. Abaixo está uma tabela com as bibliotecas principais instaladas.

| Biblioteca  | Versão  |
|-------------|--------:|
| NextJS      |  v15.5  |
| ReactJS     |  v19.1  |
| TailwindCSS |     v4  |
| Lucide      | v0.054  |
| js-cookie   | v3.0.5  |

Das bibliotecas externas, foram instaladas:

- **Lucide**
    - Para importar ícones específicos.
- **js-cookie**
    - Para acessar os cookies em _client components_.

## Iniciando a aplicação

### Antes de iniciar qualquer operação

#### API Key

A API Key utilizada para o consumo de APIs externas é a da [commodities-api](https://commodities-api.com/). É preciso utilizar uma API Key válida para o sucesso das requisições.

### Modo local

É **necessário** ter o [Node](https://nodejs.org/pt) instalado em seu computador. É possível verificar o Node em seu computador com o seguinte comando que mostra a versão instalada.

```commandline
node --version
```

Após verificar, é necessário instalar as dependências com:

```commandline
npm install
```

Após instalar as dependências, executar o software com:

```commandline
npm run dev
```

O projeto é iniciado no link [http://localhost:3000](http://localhost:3000).

### Modo docker

É **necessário** ter instalado o [Docker](https://www.docker.com/) em seu computador. É possível verificar o Docker em seu computador com o seguinte comando:

```commandline
docker --version
```

Após a verificação, basta rodar o comando docker:

```commandline
docker compose up -d
```

O projeto é iniciado no link [http://localhost:3000](http://localhost:3000).

### Vercel

A aplicação também está implantada em um [projeto](https://merx-case.vercel.app/) na Vercel.

[![Site implantado](https://imgur.com/a/Qtx6XXT)](https://merx-case.vercel.app/)

## Observações

### Arquivo Docker

O arquivo docker foi retirado de um [template](https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile) disponibilizado na [documentação](https://nextjs.org/docs/app/getting-started/deploying#docker) do Next.

### Skeleton Loader

Foi utilizado a implementação do Skeleton Loader do [Flowbite](https://flowbite.com/docs/components/skeleton/).

### Login Fake

A implementação de login está apenas mockada com dados fixos. Logo, para acessar com o login correto, basta inserir:

|Campo|Valor|
|-----|-----|
|E-mail|teste@teste.com|
|Senha|123|