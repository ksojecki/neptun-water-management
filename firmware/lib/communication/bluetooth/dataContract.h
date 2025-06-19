#include "bluetooth/server.h"
#include "bluetooth/client.h"

namespace Bluetooth {
    class DataContract {
        protected: 
            DataContract() {};
        public: 
            DataContract(Bluetooth::Server* server) {};
            DataContract(Bluetooth::Client* client) {};
        };
}
