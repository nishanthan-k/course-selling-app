const { JsonWebTokenError } = require("jsonwebtoken");

// Define BadGatewayError
class BadGatewayError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadGatewayError";
    this.statusCode = 502;
  }
}

const errorHandler = (error, req, res, next) => {
  let status = error.statusCode || 500;
  let message = error.message || "Internal Server Error";

  if (error instanceof JsonWebTokenError) {
    status = 401;
    message = "Unauthorized - Invalid or expired token";
  } else if (error instanceof BadGatewayError) {
    status = 502;
    message = "Bad Gateway";
  } else if (error instanceof GatewayTimeoutError) {
    status = 504;
    message = "Gateway Timeout";
  } else if (error instanceof NotFoundError) {
    status = 404;
    message = "Not Found";
  }
  res.status(status).json({ msg: message });
};

module.exports = errorHandler;
