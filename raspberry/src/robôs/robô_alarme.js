
const robôs = {
  fala: require('./robô_fala'),
  música: require('./robô_música'),
};

robôs.fala.falar('Acorde, meu gostosão');

robôs.música.tocar_musica('Happier.mp3');

console.log('> [servidor-alarme] ^⁻^ All Right!');
