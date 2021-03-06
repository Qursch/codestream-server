// the Company model

'use strict';

const CodeStreamModel = require(process.env.CSSVC_BACKEND_ROOT + '/api_server/lib/models/codestream_model');
const CodeStreamModelValidator = require(process.env.CSSVC_BACKEND_ROOT + '/api_server/lib/models/codestream_model_validator');
const CompanyAttributes = require('./company_attributes');
const ArrayUtilities = require(process.env.CSSVC_BACKEND_ROOT + '/shared/server_utils/array_utilities');

class Company extends CodeStreamModel {

	getValidator () {
		return new CodeStreamModelValidator(CompanyAttributes);
	}

	async getCompanyMemberCount (data) {
		const teams = await data.teams.getByIds(this.get('teamIds') || []);
		const memberIds = teams.reduce((memberIds, team) => {
			const teamMemberIds = ArrayUtilities.difference(team.get('memberIds') || [], team.get('removedMemberIds') || []);
			memberIds = ArrayUtilities.union(memberIds, teamMemberIds);
			return memberIds;
		}, []);

		// TODO: we should really just have a count function
		const members = await data.users.getByQuery(
			{
				_id: data.users.inQuerySafe(memberIds),
				isRegistered: true,
				deactivated: false
			},
			{
				fields: ['_id'],
				hint: { _id: 1 }
			}
		);
		return members.length;
	}
}

module.exports = Company;
