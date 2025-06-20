#pragma once

#include <NimBLERemoteCharacteristic.h>
#include <NimBLECharacteristic.h>

#include "../dataField.h"

template<typename T>
using BaseDataField = DataField<T>;

template<typename T>
using ReadOnlyBaseDataField = ReadOnlyDataField<T>;

namespace Bluetooth {
    template<class T>
    class DataField: public BaseDataField<T> {
        public: 
            DataField(NimBLECharacteristic* characteristic): characteristic(characteristic) {}
            DataField(NimBLERemoteCharacteristic* characteristic): remoteCharacteristic(characteristic) {}
            
            T get() {
                return remoteCharacteristic? remoteCharacteristic->readValue<T>() : characteristic->getValue<T>();
            }

            void set(T value) {
                this->characteristic->setValue(value);
            }

            void subscribe(void (*callback)(T) = 0) {
                // this->characteristic->getValue<T>(value);
            }
            
        protected:
            NimBLECharacteristic* characteristic;
            NimBLERemoteCharacteristic* remoteCharacteristic;
    };

    template<class T>
    class ReadOnlyDataField: public ReadOnlyBaseDataField<T>, protected DataField<T> {
        public: 
            ReadOnlyDataField(NimBLECharacteristic* characteristic): DataField<T>(characteristic) {}
            ReadOnlyDataField(NimBLERemoteCharacteristic* characteristic): DataField<T>(characteristic) {}

            T get() {
                return DataField<T>::get();
            }

        protected:
            NimBLECharacteristic* characteristic;
            NimBLERemoteCharacteristic* remoteCharacteristic;
    };
}
