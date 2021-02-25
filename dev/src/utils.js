const average = (position) => {
  let open = parseFloat(position.open)
  let close = parseFloat(position.close)
  return (open + close) / 2;
};

const sign = (number) => { return number > 0 }

const errorHandler = (error) => {
  console.log(error)
}

module.exports = {
  average, 
  sign,
  errorHandler,
}