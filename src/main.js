const _ = require('lodash');
const Binance = require('node-binance-api');
const { macdSignal } = require('./macd');
const { rsiSignal } = require('./rsi');

require('dotenv').config()
const binance = new Binance().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET
});

const CheckSignal = (symbol, interval, callback) => {
  binance.candlesticks(symbol, interval, (error, ticks, symbol) => {
    chart = _.map(ticks, p => ({
      time: p[0],
      open: p[1],
      high: p[2],
      low: p[3],
      close: p[4],
      volume: p[5],
      closeTime: p[6],
      assetVolume: p[7],
      trades: p[8],
      buyBaseVolume: p[9],
      buyAssetVolume: p[10],
    }))
    macdSignal(symbol, interval, chart, callback)
    rsiSignal(symbol, interval, chart, callback)
  }, {limit: 100});
}

module.exports = {
  CheckSignal
}