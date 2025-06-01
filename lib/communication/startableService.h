#pragma once

class StartableService {
public:
    virtual ~StartableService() = default;

    /**
     * @brief Starts the service.
     * @return true if the service started successfully, false otherwise.
     */
    virtual void start() = 0;
};