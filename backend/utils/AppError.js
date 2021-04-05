class AppError extends Error {
   constructor(message, errCode) {
      super(message);
      this.errCode = errCode;
      this.status = `${errCode}`[0] == 4 ? 'fail' : 'error';
      this.isUserError = true;
   }
}
module.exports = AppError;
