const { LAMBDA_ENV = 'development' } = process.env;

module.exports = LAMBDA_ENV === 'production';
