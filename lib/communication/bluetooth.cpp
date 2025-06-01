#include <Arduino.h>
#include "bluetooth.h"
#include <BLEDevice.h>

#define SERVICE_UUID "772b9c75-c4b4-4a88-8419-10e80bece60f"

class ConnectionCallback: public BLEServerCallbacks {
  Bluetooth* bluetooth;
  public: 
    ConnectionCallback(Bluetooth* bluetooth) {
        this->bluetooth = bluetooth;
    }
    void onConnect(BLEServer* pServer) {
        Serial.println("Connected");
        this->bluetooth->connected = true;
        
    };
    void onDisconnect(BLEServer* pServer) {
        Serial.println("Disconected");
        this->bluetooth->connected = false;
        this->bluetooth->server->getAdvertising()->start();
    }
};

std::string DeviceName = "NEPTUN_BARREL";

void Bluetooth::start() {
    BLEDevice::init(DeviceName);
    this->server = BLEDevice::createServer();
    Serial.println("Bluetooth initialized");

    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->addServiceUUID(SERVICE_UUID);
    this->server->getAdvertising()->start();
    this->server->setCallbacks( new ConnectionCallback(this));
}

bool Bluetooth::isConected() {
    return this->connected;
}
