'use strict';

var CodeStreamAPITest = require(process.env.CS_API_TOP + '/lib/test_base/codestream_api_test');
var ObjectID = require('mongodb').ObjectID;

class NotFoundTest extends CodeStreamAPITest {

	get description () {
		return 'should return an error when trying to fetch a user that doesn\'t exist';
	}

	getExpectedError () {
		return {
			code: 'RAPI-1003'
		};
	}

	// before the test runs...
	before (callback) {
		// we'll try to fetch a non-existent user, with a random ID
		this.path = '/users/' + ObjectID();
		callback();
	}
}

module.exports = NotFoundTest;
