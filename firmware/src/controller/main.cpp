#include <Arduino.h>
#include <bluetoothServer.h>
#include <dataField.h>
#include <bluetoothClient.h>

#define BLUETOOTH_SERVICE_UUID "772b9c75-c4b4-4a88-8419-10e80bece60f"
#define BLUETOOTH_DEVICE_NAME "NEPTUN_WATER_LEVEL_SENSOR"

#define LED_PIN 0
#define ULTRASOUND_TRIGGER_PIN 1
#define ULTRASOUND_ECHO_PIN 3

BluetoothServer *bluetooth;
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
    Serial.println("Controller is ready");
    BluetoothClient* client = new BluetoothClient();
    client->connect();
}

void loop()
{
    delay(2000);
    Serial.println(millis());
}