// test constants for testing the posts module

'use strict';

const RepoAttributes = require(process.env.CSSVC_BACKEND_ROOT + '/api_server/modules/repos/repo_attributes');
const TeamAttributes = require(process.env.CSSVC_BACKEND_ROOT + '/api_server/modules/teams/team_attributes');
const CompanyAttributes = require(process.env.CSSVC_BACKEND_ROOT + '/api_server/modules/companies/company_attributes');
const UserAttributes = require(process.env.CSSVC_BACKEND_ROOT + '/api_server/modules/users/user_attributes');
const StreamAttributes = require(process.env.CSSVC_BACKEND_ROOT + '/api_server/modules/streams/stream_attributes');

// fields expected in all posts
const EXPECTED_REPO_FIELDS = [
	'id',
	'deactivated',
	'createdAt',
	'modifiedAt',
	'creatorId',
	'companyId',
	'teamId',
	'url',
	'normalizedUrl',
	'companyIdentifier',
	'knownCommitHashes'
];

// fields expected in the team returned, if team created on the fly
const EXPECTED_TEAM_FIELDS = [
	'id',
	'deactivated',
	'createdAt',
	'modifiedAt',
	'creatorId',
	'companyId',
	'name',
	'memberIds'
];

// fields expected in the company returned, if team creeated on the fly
const EXPECTED_COMPANY_FIELDS = [
	'id',
	'deactivated',
	'createdAt',
	'modifiedAt',
	'creatorId',
	'name'
];

const EXPECTED_REPO_RESPONSE = {
	repo: EXPECTED_REPO_FIELDS,
	team: EXPECTED_TEAM_FIELDS,
	company: EXPECTED_COMPANY_FIELDS
};

const UNSANITIZED_ATTRIBUTES = Object.keys(RepoAttributes).filter(attribute => {
	return RepoAttributes[attribute].serverOnly;
});

const UNSANITIZED_TEAM_ATTRIBUTES = Object.keys(TeamAttributes).filter(attribute => {
	return TeamAttributes[attribute].serverOnly;
});

const UNSANITIZED_COMPANY_ATTRIBUTES = Object.keys(CompanyAttributes).filter(attribute => {
	return CompanyAttributes[attribute].serverOnly;
});

const UNSANITIZED_USER_ATTRIBUTES = Object.keys(UserAttributes).filter(attribute => {
	return UserAttributes[attribute].serverOnly;
});

const UNSANITIZED_STREAM_ATTRIBUTES = Object.keys(StreamAttributes).filter(attribute => {
	return StreamAttributes[attribute].serverOnly;
});

module.exports = {
	EXPECTED_REPO_RESPONSE,
	UNSANITIZED_ATTRIBUTES,
	UNSANITIZED_TEAM_ATTRIBUTES,
	UNSANITIZED_COMPANY_ATTRIBUTES,
	UNSANITIZED_USER_ATTRIBUTES,
	UNSANITIZED_STREAM_ATTRIBUTES
};
