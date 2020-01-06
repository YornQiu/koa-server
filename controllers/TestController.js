module.exports = {
  'GET /': async (ctx, next) => {
    ctx.result = "Hello World!";
    return next();
  },
  'GET /api/index': async (ctx, next) => {
    ctx.result = "Hello World!";
    return next();
  },
  
}
