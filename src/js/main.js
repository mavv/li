// import * from 'babel-polyfill';

// const PI = 3.14;
// require('babel-polyfill');

// console.log(PI);
// window.alert('PI = ' +  PI);
let dd = document.getElementById('dump');
console.log(dd);
window.fetch('data.json')
	.then((response) => {
		return response.json();
	})
	.then((json) => {
		console.log(json);
		dd.innerHTML = json.toString;
	})
	.catch((err) => {
		console.log(err);
		dd.innerHTML = err;
	});

console.log('bla bla');
