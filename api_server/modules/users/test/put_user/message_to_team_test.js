'use strict';

var Aggregation = require(process.env.CS_API_TOP + '/server_utils/aggregation');
var CodeStreamMessageTest = require(process.env.CS_API_TOP + '/modules/messager/test/codestream_message_test');
var CommonInit = require('./common_init');

class MessageToTeamTest extends Aggregation(CodeStreamMessageTest, CommonInit) {

	constructor (options) {
		super(options);
		this.attributes = this.attributes || ['username', 'firstName', 'lastName'];
	}

	get description () {
		return 'members of the team should receive a message with the user when a user updates themselves';
	}

	// make the data that triggers the message to be received
	makeData (callback) {
		this.init(callback);
	}

	// set the name of the channel we expect to receive a message on
	setChannelName (callback) {
		// it is the team channel
		this.channelName = 'team-' + this.team._id;
		callback();
	}

	// generate the message by issuing a request
	generateMessage (callback) {
        // do the update, this should trigger a message to the
		// team channel with the updated post
        this.doApiRequest(
            {
                method: 'put',
                path: '/users/' + this.currentUser._id,
                data: this.data,
                token: this.token
            },
            (error, response) => {
                if (error) { return callback(error); }
                this.message = { users: [response.user] };
                callback();
            }
        );
	}
}

module.exports = MessageToTeamTest;
