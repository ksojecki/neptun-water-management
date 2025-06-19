#pragma once
#include "../dataField.h"

template<typename T>
using BaseDataField = DataField<T>;

namespace Bluetooth {

    template<class T>
    class DataField: BaseDataField<T> {
        public: 
            DataField(NimBLECharacteristic* characteristic): characteristic(characteristic) {}
            T get() {
                return characteristic->getValue<T>();
            }

            void set(T value) {
                this->characteristic->setValue<T>(value);
            }

            void subscribe(void (*callback)(T) = 0) {
                // this->characteristic->getValue<T>(value);
            }

        private:
            NimBLECharacteristic* characteristic;
    };
}
