#pragma once

#include <NimBLEDevice.h>
#include "startableService.h"

using namespace std;

class BluetoothServer : public StartableService { 
    public: 
        BluetoothServer(string name, string uuid);
        void start();
        bool isConected();
    private:
        NimBLEServer* server;
        bool connected;
        BLEClient* client;
        string name;
        string serviceUuid;
        uint16_t connectionHandler;
    friend class ConnectionCallback;
};