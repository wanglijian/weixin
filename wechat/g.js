'use strict'
var sha1 = require('sha1');
var Wechat = require('./wechat');
var getRawBody = require('raw-body');
var util = require('./util');

module.exports = function(opts, handler) {
	var wechat = new Wechat(opts);
	return function *(next) {

		// console.log(this.query);
		
		var token = opts.token;
		var signature = this.query.signature;
		var echostr = this.query.echostr;
		var nonce = this.query.nonce;
		var timestamp = this.query.timestamp;

		var str = [token, timestamp, nonce].sort().join('');

		var sha = sha1(str);
		if(this.method === 'GET') {

			if(sha === signature) {
				this.body = echostr;
			}else {
				this.body = 'wrong';
			}
		}
		else if(this.method === 'POST') {
			if(sha !== signature) {
				this.body = 'wrong';
				return false;
			}

			var data = yield getRawBody(this.req, {
				length: this.length,
				limit: '1mb',
				encoding: this.charset
			})

			// console.log(data.toString());
			var content = yield util.parseXML(data);
			// console.log(content);
			var message = util.formatMessage(content.xml);
			console.log(message);
			// if(message.MsgType === 'event') {
			// 	if(message.Event === 'subscribe') {
			// 		var now = new Date().getTime();
			// 		this.status = 200;
			// 		this.type = 'application/xml';
			// 		this.body = ;
			// 		return;
			// 	}
			// }
			this.weixin = message;
			yield handler.call(this, next);
			wechat.reply.call(this);
		}
	}
}