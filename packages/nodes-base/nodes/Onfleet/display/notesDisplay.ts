import {
	INodeProperties
} from 'n8n-workflow';

export const notesDisplay: INodeProperties = {
	displayName: 'Notes',
	name: 'notes',
	type: 'string',
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
	description: 'Task notes.',
	required: false,
	default: '',
};