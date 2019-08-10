
// ----------------------------------- BIBLIOTECAS ----------------------------------- //

#include <PushButton.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// -------------------------------- VARIÁVEIS GLOBAIS -------------------------------- //

String link = "http://10.0.1.9:3030/desativar_alarme";

// ----------------------------- OBJETOS DAS BIBLIOTECAS ----------------------------- //

HTTPClient http;
PushButton botao(3);

// -------------------------------------- SETUP -------------------------------------- //

void setup(){
	WiFi.mode(WIFI_STA);
	WiFi.begin("LUIZ ANTONIO", "LAURA@RITA");

	do{
		delay(100);
	} while (WiFi.status() != WL_CONNECTED);
}

// -------------------------------------- LOOP -------------------------------------- //

void loop(){
	botao.read();
	
	if(botao.pressed()){
		http.begin(link);
		http.GET();
		http.end();
	}

	delay(100);
}

// -------------------------------- FIM DO ALGORITMO -------------------------------- //
