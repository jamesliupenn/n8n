import {
	INodeProperties
} from 'n8n-workflow';

export const toDisplay: INodeProperties = {
	displayName: 'To',
	name: 'to',
	type: 'dateTime',
	displayOptions: {
		show: {
			resource: [
				'tasks',
			],
			operation: [
				'list',
			],
		},
	},
	description: 'The ending time of the range. Defaults to current time if not specified.',
	required: false,
	default: null,
};