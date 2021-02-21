const _ = require('lodash');
const Binance = require('node-binance-api');
const { macdSignal } = require('./macd');
const { average } = require('./utils')

require('dotenv').config()
const binance = new Binance().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET
});

const CheckSignal = (symbol, interval, callback) => {
  binance.candlesticks(symbol, interval, (error, ticks, symbol) => {
    candle = _.map(ticks, (p) => (average({open:p[1], close:p[4]})));
    if (macdSignal(symbol, interval, candle)) callback("MACD", symbol, interval)
  }, {limit: 100});
}

module.exports = {
  CheckSignal
}