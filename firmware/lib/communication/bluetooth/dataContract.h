#pragma once
#include "bluetooth/server.h"
#include "bluetooth/client.h"

using namespace std;

namespace Bluetooth {

    class DataContract {
        public: 
            DataContract(Server* server) {}
            DataContract(MappedCharacteristic client) {}
            static const string serviceUuid;
        protected: 
            DataContract() {}
    };
}
