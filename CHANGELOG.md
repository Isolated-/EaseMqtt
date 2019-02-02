# EaseMqtt - CHANGELOG

[![Build Status](https://travis-ci.org/Isolated-/EaseMqtt.svg?branch=master)](https://travis-ci.org/Isolated-/EaseMqtt)

*Version: **0.1.0***

# Version [0.1.0] - 2019-02-01

### Added
- Interface: All classes use an implementation of an interface to support extension.
- Error: `EaseError` has been added as a replacement to `Error`.
- Class: `EaseMqtt` - the main class / constructor
    - Method: `getDefault(opt)` - fill the option object with defaults 
    - Method: `publish(topic, message, qos)` - publish a message to topic(s)
    - Method: `subscribe(topic, qos)` - subscribe to multiple topic(s)
    - Method: `end()` - end the `MqttClient` connection
