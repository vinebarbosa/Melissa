/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-console */

// ---------------------------------------------------------------------------------- //

const { exec } = require('async-shelljs');
const { resolve } = require('path');
const express = require('express');
const cors = require('cors');
const ip = require('ip');

const hostname = ip.address();
const porta = 80;

const servidor = express();

let horas;
let minutos;
let id_timeout;
let configurado = false;

// ------------------------------------------------------------------------------------------- //

function configurar_alarme(horas = 0, minutos = 0) {
  const tempo_restante = obter_tempo_restante(horas, minutos);

  horas = horas < 10 ? (`0${horas.toString()}`) : horas;
  minutos = minutos < 10 ? (`0${minutos.toString()}`) : minutos;

  id_timeout = setTimeout(rotina_alarme, tempo_restante);

  configurado = true;

  console.log(`> [servidor-cremoso] Horário do alarme configurado para ${horas}:${minutos}`);
}

// ------------------------------------------------------------------------------------------ //

function obter_tempo_restante(horas = 0, minutos = 0) {
  const agora = new Date();
  const horário = new Date();

  horário.setHours(horas);
  horário.setMinutes(minutos);
  horário.setSeconds(0);
  horário.setMilliseconds(0);

  let tempo_restante = horário - agora;

  if (tempo_restante < 1) {
    horário.setDate(horário.getDate() + 1);
    tempo_restante = horário - agora;
  }

  return tempo_restante;
}

// ------------------------------------------------------------------------------------------ //

function rotina_alarme() {
  exec(`node ${resolve(__dirname, 'robôs', 'robô_alarme.js')}`, { async: true });

  configurado = false;
}

// ---------------------------------------------------------------------------------- //

servidor.use(cors());

// ------------------------------------------------------------------------------------------- //

servidor.use((req, res, next) => {
  console.log(`> [servidor-cremoso] Novo ${req.method}: http://${hostname}:${porta}${req.url}`);
  next();
});

// ------------------------------------------------------------------------------------------- //

servidor.post('/novo_alarme', (req, res) => {
  horas = Number(req.query.horas);
  minutos = Number(req.query.minutos);
  configurar_alarme(horas, minutos);
  res.sendStatus(200);
});

// ------------------------------------------------------------------------------------------ //

servidor.post('/cancelar', (req, res) => {
  clearTimeout(id_timeout);
  configurado = false;
  console.log('> [servidor-cremoso] Alarme cancelado pelo usuário');
  res.sendStatus(200);
});

// ------------------------------------------------------------------------------------------ //

servidor.get('/configurado', (req, res) => {
  const json = { configurado };
  return res.send(json);
});

// ---------------------------------------------------------------------------------- //

servidor.use('/js', express.static(`${__dirname}/web/js`));
servidor.use('/css', express.static(`${__dirname}/web/css`));
servidor.use('/img', express.static(`${__dirname}/web/img`));
servidor.use('/fonts', express.static(`${__dirname}/web/fonts`));

// ---------------------------------------------------------------------------------- //

servidor.use(require('./routes'));

// ---------------------------------------------------------------------------------- //

servidor.listen(porta, hostname, () => {
  console.log(`> [servidor-cremoso] Ouvindo em http://${hostname}:${porta}`);
});

// ------------------------------------------------------------------------------------------ //
