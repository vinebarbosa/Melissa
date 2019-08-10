const ip = require('ip');

const terminal = require('shelljs');

const robô_música = {
  player: 'mplayer -ao alsa -noconsolecontrols -really-quiet',
  url: `http://${ip.address()}/ligar_sirene`,
  tocar_musica(musica = '') {
    console.log('> [robô-música] Reproduzindo música...');
    terminal.exec(`${this.player} './src/music/${musica}' && wget -q ${this.url} && rm -r ligar_sirene`);
    console.log('> [robô-música] Feito!');
  },
};

module.exports = robô_música;
