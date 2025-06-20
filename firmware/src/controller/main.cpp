#include <Arduino.h>
#include <bluetooth/client.h>
#include <dataField.h>
#include <tank.h>

#define BLUETOOTH_DEVICE_NAME "NEPTUN_CONTROLLER"

#define LED_PIN 0
#define ULTRASOUND_TRIGGER_PIN 1
#define ULTRASOUND_ECHO_PIN 3

DataField<float> *waterLevel;
using namespace std;
using namespace DataContract;

Bluetooth::ConnectedDataContracts<Tank> tanks;
Bluetooth::Client* client;

void connect() {
    tanks = client->connect<Tank>(Tank::serviceUuid);
}

void setup()
{
    Serial.begin(9600);
    Serial.setDebugOutput(true);
    pinMode(LED_PIN, OUTPUT); // Led light for debug purpose
    digitalWrite(LED_PIN, HIGH); // Turn off led light
    // Wait 1 second for initialize of serial protocol for debug purpose
    delay(2000);
    Serial.println("Controller is ready");
    Bluetooth::Client* client = new Bluetooth::Client(BLUETOOTH_DEVICE_NAME);
    tanks = client->connect<Tank>(Tank::serviceUuid);
}

void loop()
{
    delay(2000);
    if(tanks.size() == 0) {
        connect();
    }
    Serial.print("\n");
    Serial.print(millis());
    Serial.println(":\tDevices:");
    for (auto const& [address, tank] : tanks) {
        Serial.printf("Address %s, Capacity %f collected: %f\n", address.c_str(), tank->capacity()->get(), tank->filled()->get());
    }
}