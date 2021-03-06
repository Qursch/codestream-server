'use strict';

const EditingTest = require('./editing_test');
const Assert = require('assert');
const BoundAsync = require(process.env.CSSVC_BACKEND_ROOT + '/shared/server_utils/bound_async');

class NoEditingNonFileTest extends EditingTest {

	get description () {
		return `should return an empty response when trying to set editing for a ${this.type} stream`;
	}

	before (callback) {
		BoundAsync.series(this, [
			super.before,
			this.createOtherStream
		], callback);
	}

	createOtherStream (callback) {
		this.streamFactory.createRandomStream(
			(error, response) => {
				if (error) { return callback(error); }
				this.data.streamId = response.stream.id;
				callback();
			},
			{
				type: this.type,
				memberIds: [this.users[1].user.id],
				teamId: this.team.id,
				token: this.token
			}
		);
	}

	// validate the response to the test request
	validateResponse (data) {
		Assert.deepEqual(data, { streams: [] }, 'expected empty streams');
	}

}

module.exports = NoEditingNonFileTest;
