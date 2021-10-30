export class ErrorHandler extends Error {
  constructor(statusCode, message, details) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}

export const handleError = (err, res) => {
  const { statusCode = 500, message = 'An unexpected error has occurred', details } = err;
  const detailsField = details ? { details } : { };

  res
    .status(statusCode)
    .send({
      code: statusCode,
      message,
      ...detailsField,
    });
};


