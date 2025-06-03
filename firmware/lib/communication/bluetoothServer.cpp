#include <Arduino.h>
#include "bluetoothServer.h"
#include <NimBLEDevice.h>

#define DEVICE_NAME "NEPTUN_WATER_SENSOR"
#define WATER_LEVEL_UUID "00000014-d511-4774-8ec2-b7a3d0cd6140"


class ConnectionCallback: public NimBLEServerCallbacks {
  BluetoothServer* bluetooth;
  public: 
    ConnectionCallback(BluetoothServer* bluetooth) {
        this->bluetooth = bluetooth;
    }
    void onConnect(BLEServer* pServer, ble_gap_conn_desc* desc) {
        Serial.println("Connected" );
        this->bluetooth->connected = true;
        this->bluetooth->client = BLEDevice::getClientByHandle(desc->conn_handle);;
    };
    void onDisconnect(BLEServer* pServer) {
        Serial.println("Disconected");
        this->bluetooth->connected = false;
        this->bluetooth->server->getAdvertising()->start();
    }
};

BluetoothServer::BluetoothServer(string name, string uuid) 
    : name(name), serviceUuid(uuid), connected(false) {
}

void BluetoothServer::start() {
    NimBLEDevice::init(this->name);
    this->server = NimBLEDevice::createServer();
    NimBLEDevice::setDefaultPhy(BLE_GAP_LE_PHY_1M_MASK, BLE_GAP_LE_PHY_1M_MASK);
    NimBLEDevice::setPower(ESP_PWR_LVL_P21);
    Serial.println("Bluetooth initialized");

    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->addServiceUUID(this->serviceUuid);
    this->server->getAdvertising()->start();
    this->server->setCallbacks( new ConnectionCallback(this));
}

bool BluetoothServer::isConected() {
    return this->connected;
}
