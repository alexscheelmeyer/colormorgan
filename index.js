const morgan = require('morgan');
const chalk = require('chalk');

function colorStatuscode(code) {
  if (code >= 200 && code < 300)
    return chalk.green.bold(code);

  if (code >= 300 && code < 400)
    return chalk.cyan.bold(code);

  if (code >= 400 && code < 500)
    return chalk.yellow.bold(code);

  if (code >= 500 && code < 600)
    return chalk.red.bold(code);

  return chalk.gray(code);
}

const morganMiddleware = morgan(function (tokens, req, res) {
    return [
        chalk.hex('#f78fb3').bold((new Date(tokens.date(req, res))).toISOString()),
        chalk.hex('#34ace0').bold(tokens.method(req, res)),
        colorStatuscode(tokens.status(req, res)),
        chalk.hex('#ff5252').bold(tokens.url(req, res)),
        chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + 'ms'),
        chalk.yellow(tokens['remote-addr'](req, res)),
        chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
    ].join(' ');
});

module.exports = morganMiddleware;
