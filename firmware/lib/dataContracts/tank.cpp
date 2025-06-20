#include "tank.h"

const std::string FILLED_UUID = "00000014-d511-4774-8ec2-b7a3d0cd6140";
const std::string CAPACITY_UUID = "00000015-d511-4774-8ec2-b7a3d0cd6140";
const std::string SERVICE_UUID = "772b9c75-c4b4-4a88-8419-10e80bece60f";

const std::string DataContract::Tank::serviceUuid = SERVICE_UUID;

DataContract::Tank::Tank(Bluetooth::Server* server) {
    _filled = (DataField<float>*) server->setField<float>(this->serviceUuid, FILLED_UUID);
    _capacity = (DataField<float>*) server->setField<float>(this->serviceUuid, CAPACITY_UUID);
}

DataContract::Tank::Tank(Bluetooth::MappedCharacteristic characteristicMap) {
    _capacity = (DataField<float>*) new Bluetooth::DataField<float>(characteristicMap[CAPACITY_UUID]);
    _filled = (DataField<float>*) new Bluetooth::DataField<float>(characteristicMap[FILLED_UUID]);
}

DataField<float>* DataContract::Tank::capacity() {
    return this->_capacity;
}

DataField<float>* DataContract::Tank::filled() {
    return this->_filled;
}