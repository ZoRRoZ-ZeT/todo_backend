/* eslint-disable import/extensions */
import NotFoundError from '../exceptions/notFound.js';
import ValidationError from '../exceptions/validation.js';

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).json({
      statusCode: 400,
      errors: err.errors,
    });
    return;
  }

  if (err instanceof NotFoundError) {
    res.status(404).json({
      statusCode: 404,
      errors: err.errors,
    });
    return;
  }
  
  res.status(500).json({
    statusCode: 500,
    error: { type: 'UnexceptedError', errors: {} },
  });
};

export default errorMiddleware;
