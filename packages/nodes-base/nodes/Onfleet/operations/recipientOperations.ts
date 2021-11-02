import {
	INodeProperties
} from 'n8n-workflow';

export const recipientOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	displayOptions: {
		show: {
			resource: [
				'recipients',
			],
		},
	},
	options: [
		{
			name: 'Create',
			value: 'create',
			description: 'Create new Onfleet recipient',
		},
		{
			name: 'Lookup',
			value: 'lookup',
			description: 'Look up a specific Onfleet recipient',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update an Onfleet recipient',
		},
	],
	default: 'lookup',
};