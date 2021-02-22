const { sign, average, errorHandler } = require('./utils')
const macd_indicator = require('macd')

const macdSignal = (symbol, interval, chart, callback) => {
  try {
    let close = chart.map(p => parseFloat(p.close))
    if (close.length < 26) throw new Error("not enough data")
    let macd = macd_indicator(close, 26, 12, 9).histogram
    if (macd.length == 0) throw new Error ("no macd returned")
    if (sign(macd[macd.length-2]) && !sign(macd[macd.length-1])) {
      callback("MACD sell", symbol, interval)
    }
    if (!sign(macd[macd.length-2]) && sign(macd[macd.length-1])) {
      callback("MACD buy", symbol, interval)
    }
  } catch (error) {
    errorHandler(`MACD [${interval}] ${symbol}: ERROR - no macd returned`)
  }
} 

module.exports = {
  macdSignal
}