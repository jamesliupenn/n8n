import {
	INodeProperties
} from 'n8n-workflow';

export const pickupNotesDisplay: INodeProperties = {
	displayName: 'PickupNotes',
	name: 'pickupNotes',
	type: 'string',
	displayOptions: {
		show: {
			resource: [
				'tasks',
			],
			operation: [
				'createCombo',
			],
		},
	},
	description: 'Pickup task notes',
	required: false,
	default: '',
};