#ifndef _PushButton_h
#define _PushButton_h

class PushButton{
  public:
    PushButton(byte pinBotao, byte tempoDebounce = 200);
    void read();
    bool pressed();
    bool unpressed();
  
  private:
    unsigned long debounceBotao;
    bool estadoBotaoAnt = HIGH;
    bool estadoBotao;
    bool pressionado;
    bool solto;
    byte pino;
    byte tempo;  
};

#endif