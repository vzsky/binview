const _ = require('lodash');
const Binance = require('node-binance-api');
const { macdSignal } = require('./macd');
const { rsiSignal } = require('./rsi');
const { errorHandler } = require('./utils');

require('dotenv').config()
const binance = new Binance().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET
});

const CheckSignal = (symbol, interval) => (
  new Promise((resolve, reject) => {
    binance.candlesticks(symbol, interval, async (err, ticks, sym) => {
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
      let signals = [macdSignal(chart), rsiSignal(chart)]
      try {
        resolve(await Promise.all(signals))
      } catch (error) {
        errorHandler(error.message)
      }
    }, {limit: 100});
  })
)

const CheckSymbol = async (symbol) => {
  intervals = ['15m', '1h', '4h', '1d']
  promises = []
  for (let i in intervals) {
    promises.push(CheckSignal(symbol, intervals[i]))
  }
  let resolved = await Promise.all(promises)
  let result = {}
  for (let i in intervals) {
    result[intervals[i]] = resolved[i]
  }
  return result;
}

const CheckSymbols = async (symbols) => {
  let promises = []
  for (let symbol of symbols) {
    promises.push(CheckSymbol(symbol))
  }
  let resolved = await Promise.all(promises)
  return resolved
}
  

module.exports = {
  CheckSignal,
  CheckSymbol,
  CheckSymbols
}