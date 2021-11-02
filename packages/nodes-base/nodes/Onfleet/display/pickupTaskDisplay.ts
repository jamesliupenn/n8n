import {
	INodeProperties
} from 'n8n-workflow';

export const pickupTaskDisplay: INodeProperties = {
	displayName: 'PickupTask',
	name: 'pickupTask',
	type: 'boolean',
	displayOptions: {
		show: {
			resource: [
				'tasks',
			],
			operation: [
				'create',
			],
		},
	},
	description: 'Is this a pickup task?',
	required: true,
	default: false,
};