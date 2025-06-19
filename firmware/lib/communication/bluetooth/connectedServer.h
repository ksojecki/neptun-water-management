#include <string>
#include "dataField.h"

using namespace std;

namespace Bluetooth {
    class Client {
        public: 
            Client(string name);
        private:
            string name;
    };
}
