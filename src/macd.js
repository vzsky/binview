const { sign } = require('./utils')
const macd_indicator = require('macd')

const macdSignal = (symbol, interval, candle) => {
  macd = macd_indicator(candle, 26, 12, 9).histogram
  if (sign(macd[macd.length-1]) != sign(macd[macd.length-2])) {
    console.log(`[${interval}] ${symbol}: MACD Signal receive`)
  }
} 

module.exports = {
  macdSignal
}