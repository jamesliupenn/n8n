import {
	INodeProperties
} from 'n8n-workflow';

export const idDisplay: INodeProperties = {
	displayName: 'ID',
	name: 'id',
	type: 'string',
	displayOptions: {
		show: {
			resource: [
				'admins',
				'recipients',
				'tasks',
				'teams',
				'workers',
			],
		},
		hide: {
			operation: [
				'create',
				'createCombo',
				'list',
			],
		},
	},
	default: '',
	required: true,
	description: 'The ID of the object for lookup',
};