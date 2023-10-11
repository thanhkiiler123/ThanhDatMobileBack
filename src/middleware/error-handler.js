const { CustomAPIError } = require('../errors/custom-api');
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res.status(500).json({ msg: 'Something went wrong, please try again' });
};

const errorHandlerMiddleware = (app) => {
    app.use(errorHandler);
};

module.exports = errorHandlerMiddleware;
