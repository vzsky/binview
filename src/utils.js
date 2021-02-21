const average = (position) => {
  let open = parseFloat(position.open)
  let close = parseFloat(position.close)
  return (open + close) / 2;
};

const sign = (number) => { return number > 0 }

module.exports = {
  average, 
  sign,
}