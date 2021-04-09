module.exports = (err, req, res, next) => {
   return res.status(err.errCode || 500).json({
      status: err.status || 'error',
      message: err.message
   });
};
