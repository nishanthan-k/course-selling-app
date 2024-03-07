const errorHandler = (error, req, res, next) => {
  let status = error.statusCode ||  500;
  let message = error.message || "Internal Server Error";

  console.log(error)

  if (error instanceof BadGatewayError) {
    statusCode = 502;
    message = "Bad Gateway";
  } else if (error instanceof GatewayTimeoutError) {
    statusCode = 504;
    message = "Gateway Timeout";
  } else if (error instanceof NotFoundError) {
    statusCode = 404;
    message = "Not Found";
  } else if (error instanceof UnauthorizedError) {
    statusCode = 401;
    message = "Unauthorized";
  } 

  res.status(status).json({msg: message})
}


module.exports = errorHandler