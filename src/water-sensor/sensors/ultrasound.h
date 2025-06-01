#pragma once

class Ultrasound {
    public:
        Ultrasound(int triggerPin, int echoPin);
        void initialize(int triggerPin, int echoPin);
        float measure();
    private :
        int triggerPin;
        int echoPin;
        float lastValue;
        float lastExecutionTime;
};

