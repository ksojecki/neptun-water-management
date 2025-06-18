#pragma once
#include "dataField.h"

template<class T>
class BluetoothDataField: DataField<T> {
    public: 
        BluetoothDataField(NimBLECharacteristic* characteristic): characteristic(characteristic) {}
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