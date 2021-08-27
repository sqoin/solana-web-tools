


export const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app:any) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: 'http://localhost:3005',
      //target: '/',
      changeOrigin: false,
      secure: false,
      logLevel: "info",
      timeout: 20000
    })
  );
} 