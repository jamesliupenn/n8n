import {
	INodeProperties
} from 'n8n-workflow';

export const stateDisplay: INodeProperties = {
	displayName: 'State',
	name: 'state',
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
	description: 'The state of the tasks.',
	required: false,
	default: null,
};