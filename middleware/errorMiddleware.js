const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
};

const errorHandler = async (err, req, res, next) => {
  // handling common errors
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (err.name === "ForbiddenError") {
    res.status(403);
    res.json({
      message: "Unauthorized Access!",
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  } else {
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }
};

export { notFound, errorHandler };
