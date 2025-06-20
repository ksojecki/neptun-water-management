#pragma once

#include <dataField.h>
#include <bluetooth/dataContract.h>

namespace DataContract {
    class Tank : public Bluetooth::DataContract {
        public: 
            Tank(Bluetooth::Server* server);
            Tank(Bluetooth::MappedCharacteristic characteristicMap);

            DataField<float>* capacity();
            DataField<float>* filled();
            static const std::string serviceUuid;
        private:
            DataField<float>* _capacity;
            DataField<float>* _filled;
    };
}
