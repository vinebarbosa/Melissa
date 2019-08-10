/* eslint-disable no-console */
/* eslint-disable camelcase */

const terminal = require('shelljs');
const express = require('express');

const routes = new express.Router();

function imprime_status(resposta) {
  console.log(`> [servidor-cremoso] ${resposta.statusCode}`);
}

function enviar_arquivo(caminho, resposta) {
  resposta.sendFile(`${__dirname}/web/${caminho}`);
}

routes.get('/', (req, res) => {
  req.url = 'html/sala_de_controle.html';
  enviar_arquivo(req.url, res);
  imprime_status(res);
});

routes.get('/ligar_sirene', (req, res) => {
  res.sendStatus(200);
  imprime_status(res);
  console.log('> [servidor-cremoso] Pino sirene ligado');
});

routes.get('/desativar_alarme', (req, res) => {
  res.sendStatus(200);
  imprime_status(res);
  terminal.exec('killall -q mplayer');
  console.log('> [servidor-cremoso] Pino sirene desligado');
  console.log('> [servidor-cremoso] Alarme desativado');
});

routes.get('/favicon.ico', (req, res) => {
  req.url = 'img/icone.ico';
  enviar_arquivo(req.url, res);
  imprime_status(res);
});

routes.get('/*', (req, res) => {
  req.url = 'html/404.html';
  res.status(404);
  enviar_arquivo(req.url, res);
  imprime_status(res);
});

module.exports = routes;
