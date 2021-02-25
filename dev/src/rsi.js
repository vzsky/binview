const { range } = require("lodash");
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

const rsiGrapher = async (chart, period = 14) => {
  let send = [], res = []
  for (let i in range(period+1)) send.push(chart[i])
  res.push(await rsi_indicator(send, period))
  for (let i in chart) {
    if (i < period+1) continue
    send.push(chart[i]);
    res.push(await rsi_indicator(send, period))
  }
  return res
}

const rsiSignal = async (chart) => {
  try {
    let close = chart.map(p => parseFloat(p.close))
    let rsiGraph = await rsiGrapher(close, 14)
    
    let signal = []

    for (let i in rsiGraph) {
      if (rsiGraph[i] > 80) signal.push(["s", i])
      if (rsiGraph[i] < 20) signal.push(["b", i])
    }

    return signal
    
  } catch (error) {
    throw new Error(`RSI | ${error.message}`)
  }
} 

module.exports = {
  rsiSignal
}