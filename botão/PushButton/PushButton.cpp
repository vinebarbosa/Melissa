#include <Arduino.h>
#include "PushButton.h"

PushButton::PushButton (byte pinBotao , byte tempoDebounce){
  pinMode(pinBotao, INPUT_PULLUP);
  debounceBotao = millis();
  pino  = pinBotao;
  tempo = tempoDebounce;
}

void PushButton::read() {
  estadoBotao = digitalRead(pino);
  pressionado = false;
  solto       = false;

  if ((millis() - debounceBotao) > tempo){
    if (!estadoBotao && estadoBotaoAnt) {
      pressionado = true;
      debounceBotao = millis();
    } 
    else if (estadoBotao && !estadoBotaoAnt) {
      solto = true;
      debounceBotao = millis();
    }
  }
  estadoBotaoAnt = estadoBotao;
}

bool PushButton::pressed(){
  return pressionado;
}

bool PushButton::unpressed(){
  return solto;
}
