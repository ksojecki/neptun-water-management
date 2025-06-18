#include <Arduino.h>
#include "bluetoothServer.h"
#include <NimBLEDevice.h>

using namespace std;

BluetoothServer::BluetoothServer(string name) 
    : name(name) {
    NimBLEDevice::init(this->name);
    this->server = NimBLEDevice::createServer();
    NimBLEDevice::setDefaultPhy(BLE_GAP_LE_PHY_CODED_MASK, BLE_GAP_LE_PHY_CODED_MASK);
    NimBLEDevice::setPower(ESP_PWR_LVL_P21);
    Serial.println("Bluetooth started");
}

void BluetoothServer::start() {
    for (const string uuid : servicesUuid) {
        Serial.println(uuid.c_str());
        this->server->getServiceByUUID(uuid)->start();
        this->server->getAdvertising()->addServiceUUID(uuid);
    }

    this->server->getAdvertising()->start(0);
}

NimBLECharacteristic* BluetoothServer::createCharacteristicForService(string serviceUuid, string name) {
    NimBLEService *service;
    this->server->getServiceByUUID(serviceUuid);

    if (service == nullptr) {
        service = this->server->createService(serviceUuid);
        this->servicesUuid.push_back(serviceUuid);
    }
    
    service = this->server->getServiceByUUID(serviceUuid);
    NimBLECharacteristic *characteristic = service->createCharacteristic(name);
    return characteristic;
}


