'use strict';

var fs = require('fs');
var Promise = require('bluebird');

exports.readFileAsync = function(fs_path, encoding) {
	return new Promise(function(resolve, reject) {
		fs.readFile(fs_path, encoding, function(err, content) {
			if(err) reject(err)
			else resolve(content)
		})
	})
}

exports.writeFileAsync = function(fs_path, content) {
	return new Promise(function(resolve, reject) {
		fs.writeFile(fs_path, content, function(err) {
			if(err) {
				reject(err);
			}else {
				resolve();
			}
		})
	})
}