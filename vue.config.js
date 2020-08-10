const path = require('path')

function resolve(dir) {
	return path.join(__dirname, '.', dir) // 这里采用一个点，因为vue.config.js文件和package.json文件都在同一个目录下，即根目录下
}

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'@static': resolve('static'),
				'@utils': resolve('common/utils.js'),
				'wh-ui': resolve('components')
			}
		}
	},
	// proxy: {
	// 	"/api": {
	// 		target: 'http://ecm.lanntu.top',
	// 		changeOrigin: true,
	// 		ws: true
	// 	}
	// }
}
