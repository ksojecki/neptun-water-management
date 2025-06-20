#include "client.h"
#include <NimBLEDevice.h>

using namespace std;

#define BLUETOOTH_SERVICE_UUID "772b9c75-c4b4-4a88-8419-10e80bece60f"
#define BLUETOOTH_DEVICE_NAME "NEPTUN_WATER_LEVEL_SENSOR"
#define WATER_LEVEL_UUID "00000014-d511-4774-8ec2-b7a3d0cd6140"

NimBLEUUID serviceUuid(BLUETOOTH_SERVICE_UUID);

Bluetooth::Client::Client(string name): name(name) {
    NimBLEDevice::init(name);
    NimBLEDevice::setDefaultPhy(BLE_GAP_LE_PHY_CODED_MASK, BLE_GAP_LE_PHY_CODED_MASK);
    NimBLEDevice::setPower(ESP_PWR_LVL_P21);
}

Bluetooth::DeviceList Bluetooth::Client::scanForDevicesWithService(string uuid)
{
    NimBLEUUID serviceUuid(uuid);
    NimBLEScanResults scanResult = NimBLEDevice::getScan()->getResults(10 * 1000);

    Bluetooth::DeviceList deviceMap = {};

    for (const NimBLEAdvertisedDevice* device : scanResult) {
        if (device->isAdvertisingService(serviceUuid))
        {
            NimBLEClient* client = NimBLEDevice::createClient();
            Serial.println("Found sensor ");
            client->setConnectTimeout(10 * 1000);

            string deviceAddress = device->getAddress().toString();
            
            if (client->connect(device))
            {
                Serial.println("Connected");
                deviceMap[deviceAddress] = this->extractService(client->getService(serviceUuid));
            }
        }
    }
    return deviceMap;
}

Bluetooth::MappedCharacteristic Bluetooth::Client::extractService(NimBLERemoteService* service) {
    MappedCharacteristic characteristicMap = {};
    std::vector<NimBLERemoteCharacteristic*> results = service->getCharacteristics(true);
    
    for (NimBLERemoteCharacteristic* characteristic : results) {
        std::string uuid = characteristic->getUUID().toString();
        characteristicMap[uuid] = characteristic;
    }

    return characteristicMap;
}
