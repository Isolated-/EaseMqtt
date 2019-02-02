# EaseMqtt

[![Build Status](https://travis-ci.org/Isolated-/EaseMqtt.svg?branch=master)](https://travis-ci.org/Isolated-/EaseMqtt)

*Version: **0.1.0***

`EaseMqtt` was developed out of the need of a sane approach to developing services that communicate using `MQTT`.

# Introduction

This package was originally `biggerworld-mqtt`, I've now open sourced this package and decided to move it to my personal account. Because of this I also made a number of changes and restarted the version to `0.1.0`.

# Protocol

MQTT provides a lightweight messaging protocol that uses a broker to send and recieve messages from other machines. You can view the full information [here](http://mqtt.org/).

# Dependencies

I've tried to keep dependencies as low as possible, although it's worth noting these dependencies come with their own set of dependencies:

- [`EventEmitter2`](https://npmjs.org/package/eventemitter2) - an extension to the `EventEmitter` with wildcard and delimiter support.
- [`mqtt`](https://npmjs.org/package/mqtt) - used for the underlying `mqtt` mechanisms.

# Installation

This package is installed via `npm` using:

```
npm install --save easemqtt
```

# Testing

You can run all the tests using:

```
npm test
```

# Usage

The main difference in implementation is `mqtt` uses a slash `/` delimiter, by default `EaseMqtt` uses a dot `.` delimiter, of course this can be overriden by providing a `delimiter` property to the `EaseMqtt` constructor. It's also possible to use wildcards in the topic name, by default this is disabled but can be enabled with the `wildcard` property.

```javascript
import { connect, EaseMqtt } from 'easemqtt';

const client = connect('mqtt://localhost');
const easemqtt = new EaseMqtt(client);

// subscribe
easemqtt.subscribe('some.topic', 2); // topic, optional qos (default 1)

// publish
easemqtt.publish('some.topic', 'hello world'); // topic(s), content (string/object)

easemqtt.on('some.topic', (req, res) => {
    const body = req.body;
    const replyTo = req.replyTo;
    
    if (replyTo)
        return res.reply('all done'); // string or object
});
```

# Documentation

The usage example above is very simple and somewhat pointless, read the [full documentation](https://easemqtt.readthedocs.io/en/latest/).