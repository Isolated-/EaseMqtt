# EaseMqtt - CHANGELOG

[![Build Status](https://travis-ci.org/Isolated-/EaseMqtt.svg?branch=master)](https://travis-ci.org/Isolated-/EaseMqtt)

\*Version: **0.2.0-alpha\***

# Version [0.2.0] - 2019-06-24

### Added

- `async-mqtt` is now used as a wrapper around `mqtt`

# Version [0.1.3] - 2019-06-23

### Fixes

- Security issues caused by outdated dependencies

# Version [0.1.1] - 2019-02-02

### Added

- Export: `connect` is exported for convience

# Version [0.1.0] - 2019-02-01

### Added

- Interface: All classes use an implementation of an interface to support extension.
- Error: `EaseError` has been added as a replacement to `Error`.
- Class: `EaseMqtt` - the main class / constructor
  - Method: `getDefault(opt)` - fill the option object with defaults
  - Method: `publish(topic, message, qos)` - publish a message to topic(s)
  - Method: `subscribe(topic, qos)` - subscribe to multiple topic(s)
  - Method: `end()` - end the `MqttClient` connection
- Class: `EaseEventEmitter` - handles events from `MqttClient`
- Class: `EaseRequest`
- Class: `EaseResponse`
- Util: `encode` - message encoding for `mqtt` transporting
- Util: `decode` - decode a message into a readable format
- Util: `translateTopic` - translate a topic using different delimiters
- Util: `getOptionDefaults` - helper function for populating defaults
- Integration: `TravisCI` - automated integration and testing.
- Integration: `Jest` - Unit and integration testing
- Integration: `tslint` - a linting package for ensuring consistant syntax
