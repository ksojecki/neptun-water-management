#pragma once
#include <string>
#include <map>
#include <NimBLEDevice.h>

using namespace std;
 
namespace Bluetooth {
    typedef std::map<string, NimBLERemoteCharacteristic*> MappedCharacteristic;
    typedef std::map<string, MappedCharacteristic> DeviceList;

    template<typename T>
    using ConnectedDataContracts = std::map<string, T*>;

    class Client {
        public: 
            Client(string name);
            template<typename T>
            ConnectedDataContracts<T> connect(string serviceUuid) {
                ConnectedDataContracts<T> devicesWithService = {};
                auto devices = this->scanForDevicesWithService(serviceUuid);

                for (auto const& [address, characteristic] : devices) {
                    MappedCharacteristic a = characteristic;
                    devicesWithService[address] = new T(characteristic);
                }
                return devicesWithService;
            };
        private:
            DeviceList scanForDevicesWithService(string serviceUuid);
            MappedCharacteristic extractService(NimBLERemoteService* serviceUuid);
            string name;
    };
}
