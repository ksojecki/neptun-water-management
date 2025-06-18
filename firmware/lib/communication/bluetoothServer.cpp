#include <Arduino.h>
#include "bluetoothServer.h"
#include <NimBLEDevice.h>

#define WATER_LEVEL_UUID "00000014-d511-4774-8ec2-b7a3d0cd6140"

BluetoothServer::BluetoothServer(string name) 
    : name(name) {
    NimBLEDevice::init(this->name);
    this->server = NimBLEDevice::createServer();
    NimBLEDevice::setDefaultPhy(BLE_GAP_LE_PHY_CODED_MASK, BLE_GAP_LE_PHY_CODED_MASK);
    NimBLEDevice::setPower(ESP_PWR_LVL_P21);
    Serial.println("Bluetooth started");
}

void BluetoothServer::start() {
    this->isStarted = true;
}

void BluetoothServer::setService(string serviceUuid) {
    NimBLEService *service = this->server->createService(serviceUuid);
    service->start();
    this->server->getAdvertising()->addServiceUUID(serviceUuid);
    this->server->getAdvertising()->start();
}

NimBLECharacteristic* BluetoothServer::createCharacteristicForService(string serviceUuid, string name) {
    NimBLEService *service = this->server->getServiceByUUID(serviceUuid);
    NimBLECharacteristic *characteristic = service->createCharacteristic(name);
    return characteristic;
}


