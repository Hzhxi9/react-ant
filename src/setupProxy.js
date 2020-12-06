const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware(['/v1', '/v2','/shopping'], { target: 'http://localhost:3001/', changeOrigin: true }));
};
