'use strict'

exports.reply = function *() {
	var message = this.weixin;

	if(message.MsgType === 'event') {
		if(message.Event === 'subscribe') {
			if (message.EventKey) {
				console.log('扫二维码进来：' + message.EventKey + ' '+ message.ticket);
			}
			this.body = '哈哈，你订阅了这个号\r\n';
		}
		else if (message.Event === 'unsubscribe') {
			console.log('无情取关');
			this.body = '';
		}
		else if (message.Event === 'LOCATION') {
			this.body = '您上报的位置是：'+ message.Latitude + '/' + message.Longitude + '-' + message.Precision;
		}
		else if (message.Event === 'CLICK') {
			this.body = '您点击了菜单：' + message.EventKey;
		}
		else if (message.Event === 'SCAN') {
			console.log('关注后扫二维码' + message.EventKey+' '+message.Ticket);
			console.log('关注后扫二维码' + message.EventKey+' '+message.Ticket);
			this.body = '看到您扫一下哦';

		}
		else if (message.Event === 'VIEW') {
			this.body = '您点击了菜单中的链接：'+ message.EventKey;
		}
	}
	else if (message.MsgType === 'text') {
		var content = message.Content;
		var reply = '额，你说的 '+ message.Content + ' 太复杂了';
		if (content === '1') {
			reply = '天下第一吃大米';
		}
		else if (content === '2') {
			reply = '天下第二吃豆腐';
		}
		else if (content === '3') {
			reply = '天下第三吃仙丹';
		}
		else if (content === '4') {
			reply = [{
				title: '技术改变世界',
				description: '只是个描述而已',
				picurl: 'https://imgsa.baidu.com/news/q%3D100/sign=1ea7c02684b1cb1338693813ed5556da/d788d43f8794a4c257114ce207f41bd5ac6e39cc.jpg',
				url: 'http://github.com'
			}]
		}

		this.body = reply;
	}
}