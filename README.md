# DevHunter

DevHunter é um web app que agrega vagas exclusivas para desenvolvedores. 
Você pode acessa-lo [aqui](https://devhunter.vercel.app)


Tabela de conteúdos
=================
<!--ts-->
  * [Sobre](#devhunter)
  * [Tabela de Conteudo](#tabela-de-conteúdos)
  * [Tecnologias](#tecnologias)
  * [Instalação](#instalação)
  * [Como usar](#como-usar)
<!--te-->

## Tecnologias

  * [NodeJS](https://nodejs.org/)
  * [ReactJS](https://reactjs.org/)
  * [NextJS](https://nextjs.org/)
  * [MongoDB](https://www.mongodb.com/)
  * [Chakra-UI](https://chakra-ui.com/)
  * [Github Actions](https://github.com/features/actions)

## Instalação

```
git clone https://github.com/matheusAMDS/devhunter.git
```
```
cd devhunter
```
```
npm install
# ou
yarn
```

## Como usar

Primeiramente, adicione um arquivo .env.local na raiz do projeto com os seguintes dados:

```
MONGODB_URI=<SUA_URI_DO_MONGODB>
```

Depois, inicie o servidor local:

```
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu browser.

Como o NextJS não possui um recurso nativo para iniciar o cron job, cabe à escolha
do desenvolvedor de como fazer a requisição da rota `/api/jobs/cron` para adquirir e salvar 
as vagas.