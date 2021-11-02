import {
	INodeProperties
} from 'n8n-workflow';

export const adminOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	displayOptions: {
		show: {
			resource: [
				'admins',
			],
		},
	},
	options: [
		{
			name: 'Create',
			value: 'create',
			description: 'Create new Onfleet admin',
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Delete an Onfleet admin',
		},
		{
			name: 'List',
			value: 'list',
			description: 'List all Onfleet admins',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update an Onfleet admin',
		},
	],
	default: 'list',
};