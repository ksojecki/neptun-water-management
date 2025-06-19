#include <Arduino.h>
#include <bluetooth/server.h>
#include "sensors/ultrasound.h"
#include "models/tank.h"
#include <tank.h>

#define BLUETOOTH_DEVICE_NAME "NEPTUNE_WATER_LEVEL_SENSOR"

#define LED_PIN 0
#define ULTRASOUND_TRIGGER_PIN 1
#define ULTRASOUND_ECHO_PIN 3

Bluetooth::Server *bluetoothServer;
Ultrasound *ultrasound;
RoundTank *tank;
DataContract::Tank *tankStateReporting;
using namespace std;

void setup()
{
    Serial.begin(9600);
    Serial.setDebugOutput(true);
    pinMode(LED_PIN, OUTPUT); // Led light for debug purpose
    digitalWrite(LED_PIN, HIGH); // Turn off led light
    // Wait until serial is initialized for debugging purpose
    delay(2000);
    Serial.println("hello");
    ultrasound = new Ultrasound(ULTRASOUND_TRIGGER_PIN, ULTRASOUND_ECHO_PIN);
    tank = new RoundTank(0.65, 0.89, ultrasound);
    bluetoothServer = new Bluetooth::Server(BLUETOOTH_DEVICE_NAME);
    tankStateReporting = new DataContract::Tank(bluetoothServer);
    bluetoothServer->start();

    Serial.println("Water tank capacity: " + String(tank->getVolume()) + " m^3");
}

void loop()
{
    delay(2000);
    float percentage = tank->getAmountOfWaterInPercentage();
    float squareMeters = tank->getAmountOfWaterInSquareMeters();
    tankStateReporting->capacity()->set(tank->getVolume());
    tankStateReporting->filled()->set(tank->getAmountOfWaterInSquareMeters());
    
    Serial.println("Water level in percentage: " + String(percentage * 100) + "%");
    Serial.println("Collected water " + String(squareMeters) + " m^3");
}