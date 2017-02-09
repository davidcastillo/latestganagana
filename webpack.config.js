const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
    output: {
        publicPath: '/'
    },
    devtool: '#eval',
    devServer: {
        historyApiFallback: false,
        stats: 'minimal',
        port: 8080,
        host: '0.0.0.0'
    }
});
