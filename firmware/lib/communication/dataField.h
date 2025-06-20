#pragma once

#include <string>
#include <list>
#include <NimBLECharacteristic.h>

using namespace std;

enum PayloadType {
    INT,
    FLOAT
};

template <class T>
class ReadOnlyDataField {
    public: 
        virtual ~ReadOnlyDataField() = default;
        virtual T get() = 0;
        virtual void subscribe(void (*callback)(T) = 0);
};

template <class T>
class DataField : public ReadOnlyDataField<T> {
    public: 
        virtual ~DataField() = default;
        virtual void set(T value) = 0;
};