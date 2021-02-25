const stats = require("stats-lite")
const ac = require('asciichart');

const { buySellProcessSignal, sellBuyProcessSignal, pullChart} = require('./main')
const { macdSignal } = require('./macd');
const { rsiSignal } = require('./rsi');

symbols = ['BTCUSDT', 'BCHUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'DOTUSDT', 'XMRUSDT', 'ATOMUSDT', 'DOTBNB', 'ATOMBNB', 'ADABNB']

const outputTestSignal = (signal) => {
  if (signal[2] != []) {
    console.log(`MACD | double buy: ${signal[0]}, double sell: ${signal[1]}`)
    console.log("mean: %s", stats.mean(signal[2]))
    console.log("median: %s", stats.median(signal[2]))
    console.log("mode: %s", stats.mode(signal[2]))
    console.log("variance: %s", stats.variance(signal[2]))
    console.log(ac.plot(stats.histogram(signal[2], 10).values))
  }
}

const testSymbolInterval = async (symbol, interval) => {
  let chart = await pullChart(symbol, interval)

  // console.log(`[${interval}] Buy-Sell ${symbol}`)
  // outputTestSignal(buySellProcessSignal(await macdSignal(chart)))
  console.log(`[${interval}] Sell-Buy ${symbol}`)
  outputTestSignal(sellBuyProcessSignal(await macdSignal(chart)))
  // outputTestSignal(processSignal(await rsiSignal(chart)))
}
let inv = "1h"
testSymbolInterval("BTCUSDT", inv)
// testSymbolInterval("ADAUSDT", inv)
// testSymbolInterval("SOLUSDT", inv)
// testSymbolInterval("ATOMUSDT", inv)
// testSymbolInterval("NEARUSDT", inv)
