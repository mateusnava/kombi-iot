#include "DHT.h"

#define DHTPIN A0
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup(){
  Serial1.begin(9600);
   dht.begin();
}
 
void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  if (isnan(t) || isnan(h)) {
    Serial1.println("Failed to read from DHT");
  } else {
    Serial1.print("{");
    Serial1.print("\"in\": {");
    Serial1.print("\"humidity\": ");
    Serial1.print(h);
    Serial1.print(",");
    Serial1.print("\"temperature\": ");
    Serial1.print(t);
    Serial1.print("}");
    Serial1.print(", \"out\": {");
    Serial1.println("}}");
  }

  delay(1000);
 }
