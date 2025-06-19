#include "tank.h"

#define SERVICE_UUID "772b9c75-c4b4-4a88-8419-10e80bece60f"
#define FILLED_UUID "00000014-d511-4774-8ec2-b7a3d0cd6140"
#define CAPACITY_UUID "00000015-d511-4774-8ec2-b7a3d0cd6140"

DataContract::Tank::Tank(Bluetooth::Server* server) {
    _filled = (DataField<float>*) server->setField<float>(SERVICE_UUID, FILLED_UUID);
    _capacity = (DataField<float>*) server->setField<float>(SERVICE_UUID, CAPACITY_UUID);
}

DataContract::Tank::Tank(Bluetooth::Client* client) {
    
}

DataField<float>* DataContract::Tank::capacity() {
    return this->_capacity;
}

DataField<float>* DataContract::Tank::filled() {
    return this->_filled;
}