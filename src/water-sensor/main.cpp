#include <Arduino.h>
#include <bluetoothServer.h>
#include "sensors/ultrasound.h"
#include "models/tank.h"

BluetoothServer *bluetooth = new BluetoothServer();
Ultrasound *ultrasound;

RoundTank *tank;

using namespace std;

#define LED_PIN 0
#define ULTRASOUND_TRIGGER_PIN 1
#define ULTRASOUND_ECHO_PIN 3

void setup()
{
    Serial.begin(9600);
    Serial.setDebugOutput(true);
    pinMode(LED_PIN, OUTPUT); // Led light for debug purpose
    // Wait 1 second for initialize of serial protocol for debug purpose
    delay(2000);
    ultrasound = new Ultrasound(ULTRASOUND_TRIGGER_PIN, ULTRASOUND_ECHO_PIN);
    tank = new RoundTank(0.65, 0.89, ultrasound);
    bluetooth->start();
    Serial.println("Water tank capacity: " + String(tank->getVolumne()) + " m^3");
}

void loop()
{
    delay(2000);
    float percentage = tank->getAmountOfWaterInPercentage();
    float squareMeters = tank->getAmountOfWaterInSquareMeters();
    Serial.println("Water level in percentage: " + String(percentage * 100) + "%");
    Serial.println("Colected water " + String(squareMeters) + " m^3");

    Serial.print("Time: ");
    Serial.println(millis());
}