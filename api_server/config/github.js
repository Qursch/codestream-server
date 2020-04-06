// github integration configuration

'use strict';

/* eslint no-console: 0 */

const StructuredCfgFile = require('../codestream-configs/lib/structured_config');
let ShowCfg = process.env.CS_API_SHOW_CFG || false;

let GitHubCfg = {
	appClientId: null,
	appClientSecret: null,
	localProviders: {}
};

let CfgFileName = process.env.CS_API_CFG_FILE || process.env.CSSVC_CFG_FILE;
if (CfgFileName) {
	const CfgData = new StructuredCfgFile({ configFile: CfgFileName });
	ShowCfg = CfgData.getProperty('apiServer.showConfig');
	let githubProviders = CfgData.getSection('integrations.github');
	Object.keys(githubProviders).forEach(provider => {
		if (provider == 'cloud') {
			GitHubCfg.appClientId = githubProviders.cloud.appClientId;
			GitHubCfg.appClientSecret = githubProviders.cloud.appClientSecret;
		}
		else {
			GitHubCfg.localProviders[provider] = githubProviders[provider];
		}
	});
}
else {
	GitHubCfg.appClientId = process.env.CS_API_GITHUB_CLIENT_ID;
	GitHubCfg.appClientSecret = process.env.CS_API_GITHUB_CLIENT_SECRET;
}

if (ShowCfg) console.log('Config[github]:', JSON.stringify(GitHubCfg, undefined, 10));
module.exports = GitHubCfg;
