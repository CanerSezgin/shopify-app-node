module.exports = async (err, req, res, next) => {
  const { statusCode, message, isOperational } = err;
  const errorJSON = {
    status: "error",
    statusCode,
    message,
    isOperational
  }
  if(process.env.NODE_ENV === 'development'){
    console.log('---------------------------')
    console.log(errorJSON)
    console.log('---------------------------')
  }
  return res.status(statusCode).json(errorJSON);
};