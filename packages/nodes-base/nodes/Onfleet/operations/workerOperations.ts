import {
	INodeProperties
} from 'n8n-workflow';

export const workerOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	displayOptions: {
		show: {
			resource: [
				'workers',
			],
		},
	},
	options: [
		{
			name: 'Create',
			value: 'create',
			description: 'Create new Onfleet worker',
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Delete an Onfleet worker',
		},
		{
			name: 'List',
			value: 'list',
			description: 'List all Onfleet workers',
		},
		{
			name: 'Lookup',
			value: 'lookup',
			description: 'Look up a specific Onfleet worker',
		},
		{
			name: 'Lookup Schedule',
			value: 'lookupSchedule',
			description: 'Look up a specific Onfleet worker schedule',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update an Onfleet worker',
		},
	],
	default: 'lookup',
};