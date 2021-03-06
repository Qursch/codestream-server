'use strict';

const Aggregation = require(process.env.CSSVC_BACKEND_ROOT + '/shared/server_utils/aggregation');
const MessageTest = require('./message_test');
const AddReviewerTest = require('./add_reviewer_test');

class AddReviewerMessageTest extends Aggregation(MessageTest, AddReviewerTest) {

	get description () {
		return `members of the stream or team should receive a message with the review when a reviewer is added to a review in a ${this.streamType} stream`;
	}
}

module.exports = AddReviewerMessageTest;
