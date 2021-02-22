const {CheckSymbols} = require('./main')

symbols = ['BTCUSDT', 'BCHUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'DOTUSDT', 'XMRUSDT', 'ATOMUSDT', 'DOTBNB', 'ATOMBNB', 'ADABNB']

const test = async () => {
  let result = await CheckSymbols(symbols)
  for (let i in symbols) {
    for (let key in result[i]) {
      if (result[i][key].join('') == '') continue;
      console.log(symbols[i], key, result[i][key].join(', '));
    }
  }
}
test()