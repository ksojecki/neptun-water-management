#pragma once

class StartableService {
public:
    virtual ~StartableService() = default;
    virtual void start() = 0;
};