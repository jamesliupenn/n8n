import {
	INodeProperties
} from 'n8n-workflow';

export const completeAfterDisplay: INodeProperties = {
	displayName: 'CompleteAfter',
	name: 'completeAfter',
	type: 'dateTime',
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
	description: 'The earliest time the task should be completed.',
	required: false,
	default: null,
};