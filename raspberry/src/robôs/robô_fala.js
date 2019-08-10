const terminal = require('shelljs');

const robô_fala = {
  player: 'mplayer -ao alsa -noconsolecontrols -really-quiet',
  falar(frase = '') {
    console.log('> [robô-fala] Requisição efetuada');
    console.log('> [robô-fala] Aguardando resposta do Google Translate...');
    terminal.exec(`${this.player} 'http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q="${frase}"&tl=pt-br'`);
    console.log('> [robô-fala] Feito!');
  },
};

module.exports = robô_fala;
