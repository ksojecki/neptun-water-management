#pragma once

#include <BLEDevice.h>
#include "startableService.h"

class BluetoothServer : public StartableService { 
    public: 
        void start();
        bool isConected();
    private:
        BLEServer* server;
        bool connected;
    friend class ConnectionCallback;
};