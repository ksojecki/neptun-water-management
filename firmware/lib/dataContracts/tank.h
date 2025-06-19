#include <dataField.h>
#include <bluetooth/dataContract.h>

namespace DataContract {
    class Tank : Bluetooth::DataContract{
        public: 
            Tank(Bluetooth::Server* server);
            Tank(Bluetooth::Client* client);

            DataField<float>* capacity();
            DataField<float>* filled();
        private:
            DataField<float>* _capacity;
            DataField<float>* _filled;
    };
}
