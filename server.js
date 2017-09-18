const expressApp = function() {

  const express = require('express');
  const app = express();

  // rodando a app servindo arquivos estaticos
  // no diretorio

  app.use(express.static(__dirname + '/dist'));
  app.listen(3000);
}

const jsonServerApp = function () {

  const jsonServer = require('json-server');
  const server = jsonServer.create();
  const router = jsonServer.router('db.json');
  const middlewares = jsonServer.defaults();
  const fs = require('fs');
  const port = 8080;

  server.use(middlewares);
  server.use(router);

  server.listen(port, function () {

    console.log('Json-Server esta rodando!');

  });
}

jsonServerApp();
expressApp();
