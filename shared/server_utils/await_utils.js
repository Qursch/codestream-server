// provide a utility function to wrap a function that takes a callback with one
// that returns a promise

'use strict';

module.exports = {

	callbackWrap: function(fn, ...args) {
		return new Promise((resolve, reject) => {
			const callback = (error, result) => {
				if (error) {
					reject(error);
				}
				else {
					resolve(result);
				}
			};
			const fnArgs = [...args, callback];
			fn.apply(fn.this, fnArgs);
		});
	},

	awaitParallel: async function(fns, context) {
		await Promise.all(fns.map(async f => {
			if (context) { f = f.bind(context); }
			await f();
		}));
	},

	awaitSerial: async function(fns, context) {
		for (let f of fns) {
			if (context) { f = f.bind(context); }
			await f();
		}
	}
};
