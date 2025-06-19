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

void Bluetooth::Client::connect(string uuid)
{
    NimBLEUUID serviceUuid(uuid);

    NimBLEScan *pScan = NimBLEDevice::getScan();
    NimBLEScanResults results = pScan->getResults(10 * 1000);

    for (int i = 0; i < results.getCount(); i++)
    {
        const NimBLEAdvertisedDevice *device = results.getDevice(i);

        if (device->isAdvertisingService(serviceUuid))
        {
            NimBLEClient *pClient = NimBLEDevice::createClient();
            Serial.println("Found sensor ");

            if (!pClient)
            { // Make sure the client was created
                break;
            }
            pClient->setConnectTimeout(10 * 1000);

            if (pClient->connect(device))
            {
                Serial.println("Connected");
                NimBLERemoteService *pService = pClient->getService(serviceUuid);

                if (pService != nullptr)
                {
                    Serial.println("Characteristic");
                    std::vector<NimBLERemoteCharacteristic*> results = pService->getCharacteristics();
                    for (const NimBLERemoteCharacteristic* characteristic : results) {
                        Serial.println(characteristic->getUUID().toString().c_str());
                    }

                    NimBLERemoteCharacteristic *pCharacteristic = pService->getCharacteristic(WATER_LEVEL_UUID);

                    if (pCharacteristic != nullptr)
                    {
                        float value = pCharacteristic->readValue<float>();
                        Serial.println("Value: " + String(value));
                    }
                }
            } else {
                Serial.println(pClient->getLastError());
            }
        }
    }
}