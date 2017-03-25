# remote-log

Redirect console output to remote.

## Installation

```
npm i remote-log -S
```

## Usage

``` javascript
import { enableRemoteLog, disableRemoteLog } from 'remote-log';

enableRemoteLog();

console.log('Hello');

disableRemoteLog();
```

Run a TCP server on a remote server.

```
nc -kl PORT_NUMBER
```

Run the script with specifying the environment variable `REMOTE_LOG`.

```
REMOTE_LOG=YOUR.SERVER:PORT_NUMBER node app.js
```

## License

MIT
