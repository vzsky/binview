const {CheckSignal} = require('./main')

intervals = ['1m', '5m', '1h', '4h', '1d'];
symbols = ['BTCUSDT', 'BCHUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'DOTUSDT', 'XMRUSDT', 'ATOMUSDT', 'BTCBNB', 'DOTBNB', 'ATOMBNB', 'ADABNB']

const callback = (type, symbol, interval) => {
  console.log(`[${interval}] ${symbol}: ${type} Signal receive`)
}

for (let interval of intervals) {
  for (let symbol of symbols) {
    CheckSignal(symbol, interval, callback)
  }
}