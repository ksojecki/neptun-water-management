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
class DataField {
    public: 
        virtual ~DataField() = default;
        virtual void set(T value) = 0;
        virtual T get() = 0;
        virtual void subscribe(void (*callback)(T) = 0);
};