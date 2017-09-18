const expressApp = function() {

  const express = require('express');
  const app = express();

  // rodando a app servindo arquivos estaticos
  // no diretorio

  const forceSSL = function() {
    return function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(
         ['https://', req.get('Host'), req.url].join('')
        );
      }
      next();
    }
  }

  app.use(express.static(__dirname + '/dist'));
  //app.use(forceSSL());
  
  app.listen(process.env.PORT || 1337);
  console.log("express rodando na porta:", process.env.PORT || 1337);
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
