#include <Arduino.h>
#include <bluetooth.h>

Bluetooth* bluetooth = new Bluetooth();

void setup()
{
  Serial.begin(9600);
  Serial.setDebugOutput(true);

  pinMode(0, OUTPUT);

  // Wait 1 second for initialize of serial protocol for debug purpose
  delay(1000);
  bluetooth->start();
  Serial.println("Initialized");
}

bool flip = false;

void loop() {
  delay(1000);
  digitalWrite(0, bluetooth->isConected());
}