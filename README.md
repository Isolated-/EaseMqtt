# EaseMqtt

[![CI - Node.js (v12)](https://github.com/Isolated-/EaseMqtt/actions/workflows/next_ci_12.yml/badge.svg)](https://github.com/Isolated-/EaseMqtt/actions/workflows/next_ci_12.yml)

- Current version: `v0.2.1-build.*`

`EaseMqtt` provides a simple event-layer to simplify the development of Node.js services requiring MQTT communication. The package provides request/response pattern above publish/subscribe pattern provided by MQTT.

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

  if (replyTo) return res.reply('all done'); // string or object
});
```

# Documentation

The usage example above is very simple and somewhat pointless, read the [full documentation](https://easemqtt.readthedocs.io/en/latest/).
