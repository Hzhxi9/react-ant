const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware(['/v1', '/v2'], { target: 'http://localhost:3004/', changeOrigin: true }));
};
