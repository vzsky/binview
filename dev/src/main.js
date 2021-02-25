const _ = require('lodash');
const Binance = require('node-binance-api');
const { errorHandler } = require('./utils');

require('dotenv').config()
const binance = new Binance().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET
});

const pullChart = (symbol, interval, endTime) => (
  new Promise((resolve, reject) => {
    let options = {}
    if (endTime) { options = {limit: 500, endTime} }
    else { options = {limit: 500} }
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

      try {
        resolve(chart)
      } catch (error) {
        errorHandler(error.message)
      }
    }, options);
  })
)

const processSignal = (from, to) => {
  const func = (signals) => {
    let last = 0, bought = 0, doubleBuy = 0, doubleSell = 0
    let timePerTrade = []
    for (let signal of signals) {
      if (signal[0] == from) {
        if (bought) doubleBuy ++
        bought = 1
        last = signal[1]
      }
      if (signal[0] == to) { 
        if (!bought) doubleSell ++
        bought = 0
        timePerTrade.push(signal[1]-last)
      }
    }
    return [doubleBuy, doubleSell, timePerTrade]
  }
  return func
}

const buySellProcessSignal = processSignal("b", "s")
const sellBuyProcessSignal = processSignal("s", "b")

module.exports = {
  pullChart,
  buySellProcessSignal,
  sellBuyProcessSignal,
}