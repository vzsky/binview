const {CheckSignal} = require('./main')

intervals = ['1m', '5m', '1h', '4h', '1d'];
symbols = ['BTCUSDT', 'BCHUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'DOTUSDT', 'XMRUSDT', 'ATOMUSDT', 'DOTBNB', 'ATOMBNB', 'ADABNB']

const test = async () => {
  var promises = []
  for (let interval of intervals) {
    for (let symbol of symbols) {
      promises.push(CheckSignal(symbol, interval))
    }
  }
  let signals = await Promise.all(promises)
  for (let i in intervals) {
    for (let j in symbols) {
      i = parseInt(i); j = parseInt(j)
      console.log(symbols[j], intervals[i], signals[i*symbols.length + j].join(' '))
    }
  }
}
test()