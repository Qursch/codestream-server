'use strict';

/* eslint no-console: 0 */

const StructuredConfigFactory = require(process.env.CSSVC_BACKEND_ROOT + '/shared/codestream_configs/lib/structured_config');
const customConfigFunc = require(process.env.CSSVC_BACKEND_ROOT + '/shared/server_utils/custom_config');

// The restartRequired() method is meant to compare two configurations (prior &
// current) in order to determine if a 'restart' (defined by the application) is
// required.
//
// These two configuration params refer to the customzed configs if a
// customConfig option is used, otherwise they refer to the native configs.
//
// The return value can be any type and will be passed back to the caller of the
// restartRequired() method (usually it's boolean, but it doesn't have to be).
//
// function customRestartFunc(priorConfig, currentConfig) {
// }

module.exports = StructuredConfigFactory.create({
	configFile: process.env.CS_OUTBOUND_EMAIL_CFG_FILE || process.env.CSSVC_CFG_FILE,
	mongoUrl: process.env.CSSVC_CFG_URL,
	showConfigProperty: 'outboundEmailServer.showConfig',
	// customRestartFunc,
	customConfigFunc
});
