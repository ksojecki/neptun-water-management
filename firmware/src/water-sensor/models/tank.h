#include "../sensors/ultrasound.h"
enum WaterLevel {
    EMPTY,
    MEDIUM,
    FULL
};

class RoundTank {
    public: 
        RoundTank(float diameter, float height, Ultrasound* ultrasoundSensor, float sensorOffset = 0.2);
        /**
         * Contains water level from sensors and return fill percentage (0.0 - 1.0)
         * @return float - percentage of water in tank
         */
        float getAmountOfWaterInPercentage();
        /**
         * Returns amount of water in square meters
         * @return float - amount of water in square meters
         */
        float getAmountOfWaterInSquareMeters();

        float getVolume() {
            return this->volume;
        }
    private:
        float sensorOffset;
        float height;
        float volume;
        Ultrasound* ultrasoundSensor;
};