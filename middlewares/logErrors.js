const logErrors = (err, req, res, next) => {
  console.error(err);
  next(err); // Al enviarle un error entiende que es middleware de error
};

export default logErrors;