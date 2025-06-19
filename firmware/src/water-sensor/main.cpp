#include <Arduino.h>
#include <bluetooth/server.h>
#include "sensors/ultrasound.h"
#include "models/tank.h"
#include <dataField.h>

#define BLUETOOTH_SERVICE_UUID "772b9c75-c4b4-4a88-8419-10e80bece60f"
#define BLUETOOTH_DEVICE_NAME "NEPTUN_WATER_LEVEL_SENSOR"
#define WATER_LEVEL_UUID "00000014-d511-4774-8ec2-b7a3d0cd6140"

#define LED_PIN 0
#define ULTRASOUND_TRIGGER_PIN 1
#define ULTRASOUND_ECHO_PIN 3

Bluetooth::Server *bluetoothServer;
Ultrasound *ultrasound;
RoundTank *tank;
DataField<float> *waterLevel;
using namespace std;

void setup()
{
    Serial.begin(9600);
    Serial.setDebugOutput(true);
    pinMode(LED_PIN, OUTPUT); // Led light for debug purpose
    digitalWrite(LED_PIN, HIGH); // Turn off led light
    // Wait 1 second for initialize of serial protocol for debug purpose
    delay(2000);
    Serial.println("hello");
    ultrasound = new Ultrasound(ULTRASOUND_TRIGGER_PIN, ULTRASOUND_ECHO_PIN);
    tank = new RoundTank(0.65, 0.89, ultrasound);
    bluetoothServer = new Bluetooth::Server(BLUETOOTH_DEVICE_NAME);
    waterLevel = (DataField<float>*) bluetoothServer->setField<float>(BLUETOOTH_SERVICE_UUID, WATER_LEVEL_UUID);
    bluetoothServer->start();

    Serial.println("Water tank capacity: " + String(tank->getVolumne()) + " m^3");
}

void loop()
{
    delay(2000);
    float percentage = tank->getAmountOfWaterInPercentage();
    float squareMeters = tank->getAmountOfWaterInSquareMeters();
    Serial.println("Water level in percentage: " + String(percentage * 100) + "%");
    waterLevel->set(percentage);
    Serial.println("Collected water " + String(squareMeters) + " m^3");
    Serial.print("Time: ");
    Serial.println(millis());
}