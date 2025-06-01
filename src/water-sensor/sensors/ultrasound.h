#pragma once

namespace Sensors {
    class Ultrasound {
    public:
        Ultrasound();
        ~Ultrasound();

        void initialize();
        void measure()
    };
}
