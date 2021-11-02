import {
	INodeProperties
} from 'n8n-workflow';

export const taskOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	displayOptions: {
		show: {
			resource: [
				'tasks',
			],
		},
	},
	options: [
		{
			name: 'Clone',
			value: 'clone',
			description: 'Clone an Onfleet task',
		},
		{
			name: 'Complete',
			value: 'complete',
			description: 'Force-complete a started Onfleet task',
		},
		{
			name: 'Create',
			value: 'create',
			description: 'Create new Onfleet task',
		},
		{
			name: 'Create Pickup/Dropoff Combo',
			value: 'createCombo',
			description: 'Create new Onfleet pickup/dropoff tasks',
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Delete an Onfleet task',
		},
		{
			name: 'List',
			value: 'list',
			description: 'List Onfleet tasks',
		},
		{
			name: 'Lookup',
			value: 'lookup',
			description: 'Look up a specific Onfleet task',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update an Onfleet task',
		},

	],
	default: 'lookup',
};