import {
	INodeProperties
} from 'n8n-workflow';

export const lastIdDisplay: INodeProperties = {
	displayName: 'LastId',
	name: 'lastId',
	type: 'string',
	displayOptions: {
		show: {
			resource: [
				'tasks',
			],
			operation: [
				'list',
			],
		},
	},
	description: 'The last Id to walk the paginated response.',
	required: false,
	default: null,
};