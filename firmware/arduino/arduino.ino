#include "DHT.h"
#include <OneWire.h>
#include <DallasTemperature.h>

#define DS18B20_OneWire 10
#define DHTPIN A0
#define DHTTYPE DHT11
#define LED 13

OneWire oneWire(DS18B20_OneWire);
DHT dhtIn(DHTPIN, DHTTYPE);

DallasTemperature sensors(&oneWire);
DeviceAddress sensorOut;

void setup(){ 
  dhtIn.begin();
  sensors.begin();

  Serial1.begin(9600);

  pinMode(LED, OUTPUT);

  if (!sensors.getAddress(sensorOut, 0)) 
     Serial.println("Sensores nao encontrados !")  ;
}
 
void loop() {
  digitalWrite(LED, HIGH);
  float humIn = dhtIn.readHumidity();
  float tempIn = dhtIn.readTemperature();

  sensors.requestTemperatures();
  float tempOut = sensors.getTempC(sensorOut);

  if (isnan(tempIn) || isnan(humIn) || isnan(tempOut)) {
    Serial1.println("Failed to read");
  } else {
    Serial1.print("{");

    Serial1.print("\"in\": {");
    Serial1.print("\"humidity\": ");
    Serial1.print(humIn);
    Serial1.print(",");
    Serial1.print("\"temperature\": ");
    Serial1.print(tempIn);
    Serial1.print("},");
    Serial1.print("\"out\": {");
    Serial1.print("\"temperature\": ");
    Serial1.print(tempOut);
    Serial1.println("}}");
    
  }

  delay(1000);
  digitalWrite(LED, LOW);
  delay(9000);
 }
