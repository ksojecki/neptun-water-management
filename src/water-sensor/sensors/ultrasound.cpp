#include "ultrasound.h"
#include <Arduino.h>

using namespace std;

#define SPEED_OF_SOUND 343.0
#define MICROSECONDS_PER_SECOND 1000000.0

#define ULTRASOUND_POLLING_INTERVAL 1000 // in milliseconds

Ultrasound::Ultrasound(int _triggerPin, int _echoPin) : triggerPin(_triggerPin), echoPin(_echoPin), lastExecutionTime(0) {
    pinMode(this->triggerPin, OUTPUT); // Set trigger pin as output
    digitalWrite(this->triggerPin, LOW);
    pinMode(this->echoPin, INPUT);
    string message = "Ultrasound ready on trigger pin: ";
    message += to_string(this->triggerPin) + " and echo pin: " + to_string(this->echoPin);
    Serial.println(message.c_str());
}

float Ultrasound::measure() {
    unsigned long currentTime = millis();
    if (this->lastExecutionTime + ULTRASOUND_POLLING_INTERVAL > currentTime) {
        return this->lastValue;
    }
    digitalWrite(this->triggerPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(this->triggerPin, LOW);
    unsigned long duration = pulseIn(this->echoPin, HIGH);
    this->lastValue = (duration * SPEED_OF_SOUND) / (2 * MICROSECONDS_PER_SECOND);
    this->lastExecutionTime = millis();
    return this->lastValue;
}