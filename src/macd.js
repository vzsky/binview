const { sign } = require('./utils')
const macd_indicator = require('macd')

const macdSignal = async (chart) => {
  try {
    let close = chart.map(p => parseFloat(p.close))
    if (close.length < 26) throw new Error("not enough data")
    let macd = macd_indicator(close, 26, 12, 9).histogram
    if (macd.length == 0) throw new Error ("no macd returned")
    let res = ""
    if (sign(macd[macd.length-2]) && !sign(macd[macd.length-1])) 
      res = "MACD sell"
    if (!sign(macd[macd.length-2]) && sign(macd[macd.length-1])) 
      res = "MACD buy"

    return res

  } catch (error) {
    throw new Error(`MACD | ${error.message}`)
  }
} 

module.exports = {
  macdSignal
}