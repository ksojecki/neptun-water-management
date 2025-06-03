#include "tank.h"
#include <Arduino.h>

RoundTank::RoundTank(float diameter, float height, Ultrasound* ultrasoundSensor, float sensorOffset) 
    : height(height), ultrasoundSensor(ultrasoundSensor), sensorOffset(sensorOffset) {
    float radius = diameter / 2.0;
    this->volume = PI * radius * radius * this->height; 
    Serial.println("Volume " + String(this->volume * 0.5));

}

float RoundTank::getAmountOfWaterInPercentage() {
    float distance = this->ultrasoundSensor->measure();
    float waterLevel = this->height - distance + this->sensorOffset;
    if (waterLevel < 0) {
        waterLevel = 0;
    } else if (waterLevel > this->height) {
        waterLevel = this->height;
    }
    return waterLevel / this->height;
}

float RoundTank::getAmountOfWaterInSquareMeters() {
    float percentage = this->getAmountOfWaterInPercentage();
    return this->volume * percentage;
}