var path = require('path');
var util = require('./libs/util')
var wechat_file = path.join(__dirname, './config/wechat.txt');
var config = {
	wechat: {
		appID: 'wxf55138b7a731a5b5',
		appSecret: '137c0a9ba8b0661c7fbbf6dfcc18e8ee',
		token: 'eMayx',
		getAccessToken: function() {
			return util.readFileAsync(wechat_file);
		},
		saveAccessToken: function(data) {
			data = JSON.stringify(data);
			return util.writeFileAsync(wechat_file, data);
		}

	}
};

module.exports = config;