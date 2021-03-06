'use strict';

const GetMarkersTest = require('./get_markers_test');
const BoundAsync = require(process.env.CSSVC_BACKEND_ROOT + '/shared/server_utils/bound_async');

class ACLStreamTest extends GetMarkersTest {

	get description () {
		return 'should return an error when trying to fetch markers from a stream i\'m not a member of';
	}

	getExpectedError () {
		return {
			code: 'RAPI-1009'	// readAuth
		};
	}

	// before the test runs...
	before (callback) {
		BoundAsync.series(this, [
			super.before,	// do the standard set up for a fetch markers test
			this.createOtherStream	// but create another stream, we'll try to fetch from this stream instead
		], callback);
	}

	// create a different stream than the one we created the markers in
	createOtherStream (callback) {
		this.streamFactory.createRandomStream(
			(error, response) => {
				if (error) { return callback(error); }
				// we'll try to fetch from this other stream
				this.path = `/markers?teamId=${this.team.id}&streamId=${response.stream.id}`;
				callback();
			},
			{
				type: 'channel',	// not even a file stream!
				token: this.users[1].accessToken,	// other user is the creator
				teamId: this.team.id
			}
		);
	}
}

module.exports = ACLStreamTest;
