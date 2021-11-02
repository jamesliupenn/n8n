import {
	INodeProperties
} from 'n8n-workflow';

export const completeBeforeDisplay: INodeProperties = {
	displayName: 'CompleteBefore',
	name: 'completeBefore',
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
	description: 'The latest time the task should be completed.',
	required: false,
	default: null,
};