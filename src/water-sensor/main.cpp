#include <Arduino.h>
#include <bluetoothServer.h>
#include "sensors/ultrasound.h"

BluetoothServer* bluetooth = new BluetoothServer();
Sensors::Ultrasound* ultrasound = new Sensors::Ultrasound();

void setup()
{
  Serial.begin(9600);
  Serial.setDebugOutput(true);
  pinMode(0, OUTPUT); // Led light for debug purpose
  // Wait 1 second for initialize of serial protocol for debug purpose
  delay(1000);
  bluetooth->start();
  Serial.println("Initialized");
}


void loop() {
  delay(1000);
  digitalWrite(0, bluetooth->isConected());
}