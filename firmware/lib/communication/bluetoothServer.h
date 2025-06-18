#pragma once

#include <NimBLEDevice.h>
#include "startableService.h"
#include <list>
#include "dataField.h"
#include "bluetoothDataField.h"

using namespace std;

class BluetoothServer : public StartableService { 
    public: 
        BluetoothServer(string name);
        void start();

        template<typename T>
        DataField<T>* setField(string serviceUuid, string name) {
            return (DataField<T>*) new BluetoothDataField<T>(this->createCharacteristicForService(serviceUuid, name));
        }
    private:
        bool isStarted;
        NimBLEServer* server;
        string name;
        NimBLECharacteristic* createCharacteristicForService(string serviceUuid, string name);
        vector<string> servicesUuid;
};