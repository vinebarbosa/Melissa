
const botão = window.document.getElementById('botao');

let url = `http://${window.location.hostname}/configurado`;

const requisição = new XMLHttpRequest();

requisição.onreadystatechange = mostrar_botão;
requisição.open('GET', url);
requisição.send();


function mostrar_botão() {
  if (requisição.readyState === 4 && requisição.status === 200) {
    const { configurado } = JSON.parse(requisição.responseText);

    if (configurado === false) {
      botão.style.backgroundColor = '#1db954ea';
      botão.innerText = 'Ativar';
      botão.addEventListener('click', requisitar_ativar_alarme);
    } else {
      botão.style.backgroundColor = '#ff1a1a';
      botão.innerText = 'Desativar';
      botão.addEventListener('click', requisitar_cancelar_alarme);
    }
  }
}

function requisitar_ativar_alarme() {
  const input_horário = window.document.getElementById('input-tempo');

  const horas = input_horário.value.split(':')[0];
  const minutos = input_horário.value.split(':')[1];

  if (horas === undefined || minutos === undefined) {
    window.alert('Digite um horário válido!');
  } else {
    url = `http://${window.location.hostname}/novo_alarme?horas=${horas}&minutos=${minutos}`;

    requisição.open('POST', url);
    requisição.send();

    botão.style.backgroundColor = '#ff1a1a';
    botão.innerText = 'Desativar';

    botão.removeEventListener('click', requisitar_ativar_alarme);
    botão.addEventListener('click', requisitar_cancelar_alarme);
  }
}

function requisitar_cancelar_alarme() {
  url = `http://${window.location.hostname}/cancelar`;

  requisição.open('POST', url);
  requisição.send();

  botão.style.backgroundColor = '#1db954ea';
  botão.innerText = 'Ativar';

  botão.removeEventListener('click', requisitar_cancelar_alarme);
  botão.addEventListener('click', requisitar_ativar_alarme);
}
