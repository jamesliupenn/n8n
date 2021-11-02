import {
	INodeProperties
} from 'n8n-workflow';

export const teamOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	displayOptions: {
		show: {
			resource: [
				'teams',
			],
		},
	},
	options: [
		{
			name: 'Create',
			value: 'create',
			description: 'Create new Onfleet team',
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Delete an Onfleet team',
		},
		{
			name: 'List',
			value: 'list',
			description: 'List Onfleet teams',
		},
		{
			name: 'Lookup',
			value: 'lookup',
			description: 'Look up a specific Onfleet team',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update an Onfleet team',
		},

	],
	default: 'lookup',
};