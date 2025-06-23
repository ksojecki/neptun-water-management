#include <Arduino.h>
#include <bluetooth/server.h>
#include "sensors/ultrasound.h"
#include "models/tank.h"
#include <tank.h>

#define BLUETOOTH_DEVICE_NAME "NEPTUNE_WATER_LEVEL_SENSOR"

#define LED_PIN 0
#define ULTRASOUND_TRIGGER_PIN 1
#define ULTRASOUND_ECHO_PIN 3
#define ADVERTISE_PIN 4

Bluetooth::Server *bluetoothServer;
Ultrasound *ultrasound;
RoundTank *tank;
DataContract::Tank *tankStateReporting;
using namespace std;

void advertise() {
    if (bluetoothServer == nullptr) {
        return;
    }
    bluetoothServer->advertise();
}

void setup()
{
    Serial.begin(9600);
    Serial.setDebugOutput(true);

    // Wait until serial is initialized for debugging purpose
    while(!Serial.isConnected()) {
        delay(100);
    }

    Serial.println("Water tank");

    pinMode(ADVERTISE_PIN, INPUT);
    attachInterrupt(digitalPinToInterrupt(ADVERTISE_PIN), advertise, RISING);

    pinMode(LED_PIN, OUTPUT); // Led light for debug purpose
    digitalWrite(LED_PIN, HIGH); // Turn off led light

    ultrasound = new Ultrasound(ULTRASOUND_TRIGGER_PIN, ULTRASOUND_ECHO_PIN);
    tank = new RoundTank(0.65, 0.89, ultrasound);

    bluetoothServer = new Bluetooth::Server(BLUETOOTH_DEVICE_NAME);
    tankStateReporting = new DataContract::Tank(bluetoothServer);

    bluetoothServer->start();
    advertise();

    tankStateReporting->capacity()->set(tank->getVolume());
    Serial.println("Water tank capacity: " + String(tank->getVolume()) + " m^3");
}

void loop()
{
    delay(2000);
    float percentage = tank->getAmountOfWaterInPercentage();
    float squareMeters = tank->getAmountOfWaterInSquareMeters();

    tankStateReporting->filled()->set(tank->getAmountOfWaterInSquareMeters());
    
    Serial.println("Water level in percentage: " + String(percentage * 100) + "%");
    Serial.println("Collected water " + String(squareMeters) + " m^3");
}