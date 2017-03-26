import { connect } from 'net';

let stream = null;

export function enableRemoteLog() {
  if (stream) {
    return;
  }

  const { REMOTE_LOG } = process.env;

  if (!REMOTE_LOG) {
    return;
  }

  const [ host, port ] = REMOTE_LOG.split(':');

  if (port === undefined) {
    stream = connect(host);
  } else {
    stream = connect(port, host);
  }

  const prop = {
    writable: true,
    enumerable: false,
    configurable: true,
    value: stream,
  };

  Object.defineProperties(console, {
    _stdout: prop,
    _stderr: prop,
  });
}

export function disableRemoteLog() {
  if (!stream) {
    return;
  }

  Object.defineProperties(console, {
    _stdout: {
      writable: true,
      enumerable: false,
      configurable: true,
      value: process.stdout,
    },
    _stderr: {
      writable: true,
      enumerable: false,
      configurable: true,
      value: process.stderr,
    },
  });

  stream.end();

  stream = null;
}

export function remoteLogInLambda(callback) {
  enableRemoteLog();

  return (err, data) => {
    disableRemoteLog();
    callback(err, data);
  };
}
