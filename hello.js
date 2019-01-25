'use strict'

var s = 'Hello';

function greet(name){
	console.log(s + ', ' + name + '!');
}

function hey(name){
	console.log('Hey ! ' + name);
}

//定义的是export的属性
module.exports = {
	greet: greet,
	hey: hey
};

// this is test