import {
	INodeProperties
} from 'n8n-workflow';

export const updateBodyDisplay: INodeProperties = {
	displayName: 'Update Body',
	name: 'updateBody',
	type: 'json',
	displayOptions: {
		show: {
			resource: [
				'admins',
				'recipients',
				'tasks',
				'teams',
				'workers',
			],
			operation: [
				'update',
			],
		},
	},
	default: '{}',
	required: true,
	description: 'The body to update the entity with.',
};