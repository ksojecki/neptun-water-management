#include <Arduino.h>
#include <bluetoothServer.h>
#include "sensors/ultrasound.h"
#include "models/tank.h"

#define BLUETOOTH_SERVICE_UUID "772b9c75-c4b4-4a88-8419-10e80bece60f"
#define BLUETOOTH_DEVICE_NAME "NEPTUN_WATER_SENSOR"

#define LED_PIN 0
#define ULTRASOUND_TRIGGER_PIN 1
#define ULTRASOUND_ECHO_PIN 3

BluetoothServer *bluetooth = new BluetoothServer(BLUETOOTH_DEVICE_NAME, BLUETOOTH_SERVICE_UUID);
Ultrasound *ultrasound;
RoundTank *tank;
using namespace std;

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