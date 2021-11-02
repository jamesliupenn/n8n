import {
	INodeProperties
} from 'n8n-workflow';

export const quantityDisplay: INodeProperties = {
	displayName: 'Quantity',
	name: 'quantity',
	type: 'number',
	displayOptions: {
		show: {
			resource: [
				'tasks',
			],
			operation: [
				'create',
				'createCombo',
			],
		},
	},
	description: 'Quantity of the task',
	required: false,
	default: 0,
};