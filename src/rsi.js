const { sign } = require("./utils");

const rsi_indicator = async (close, period = 14) => {
  if (close.length < period+1) throw Error("not enough data");
  close = close.slice(close.length - period-1)
  let up = 0, down = 0, upCnt = 0, downCnt = 0;
  for (let i in close) {
    if (i == 0) continue
    let delta = close[i] - close[i-1]
    if (sign(delta)) {
      up += delta
      upCnt += 1
    }
    else {
      down -= delta
      downCnt += 1
    }
  }
  let avgUp = up/upCnt
  let avgDown = down/downCnt
  if (avgDown == 0) return 100
  let RS = avgUp/avgDown
  return 100 - (100/(1+RS))
}

const rsiSignal = async (chart) => {
  try {
    let close = chart.map(p => parseFloat(p.close))
    let rsi = await rsi_indicator(close, 14)
    let res = ""
    if (rsi > 80) 
      res = "RSI overbought (SELL)"
    if (rsi < 20) 
      res = "RSI oversold (BUY)"
    return res
  } catch (error) {
    throw new Error(`RSI | ${error.message}`)
  }
} 

module.exports = {
  rsiSignal
}