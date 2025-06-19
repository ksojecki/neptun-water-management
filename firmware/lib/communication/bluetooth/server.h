#pragma once

#include <NimBLEDevice.h>
#include "startableService.h"
#include <list>
#include "dataField.h"

using namespace std;

namespace Bluetooth {
    class Server : public StartableService { 
        public: 
            Server(string name);
            void start();

            template<typename T>
            DataField<T>* setField(string serviceUuid, string name) {
                return new DataField<T>(this->createCharacteristicForService(serviceUuid, name));
            }
        private:
            bool isStarted;
            NimBLEServer* server;
            string name;
            NimBLECharacteristic* createCharacteristicForService(string serviceUuid, string name);
            vector<string> servicesUuid;
};
}