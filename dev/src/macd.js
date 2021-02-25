const { sign } = require('./utils')
const macd_indicator = require('macd')

const macdSignal = async (chart) => {
  try {
    let close = chart.map(p => parseFloat(p.close))
    if (close.length < 26) throw new Error("not enough data")
    let macd = macd_indicator(close, 26, 12, 9).histogram
    if (macd.length == 0) throw new Error ("no macd returned")
    
    let signal = []
    for (let i in macd) {
      if (i == 0) continue
      if (sign(macd[i-1]) && !sign(macd[i])) signal.push(["s", i]);
      if (!sign(macd[i-1]) && sign(macd[i])) signal.push(["b", i]);
    }
    
    return signal

  } catch (error) {
    throw new Error(`MACD | ${error.message}`)
  }
} 

module.exports = {
  macdSignal
}