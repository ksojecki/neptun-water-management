#ifndef BLUETOOTH_H
#define BLUETOOTH_H

#include <BLEDevice.h>

class Bluetooth { 
    public: 
        void start();
        bool isConected();
    private:
        BLEServer* server;
        bool connected;
    friend class ConnectionCallback;
};

#endif