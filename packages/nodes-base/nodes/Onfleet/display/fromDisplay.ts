import {
	INodeProperties
} from 'n8n-workflow';

export const fromDisplay: INodeProperties = {
	displayName: 'From',
	name: 'from',
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
	description: 'The starting time of the range. Tasks created or completed at or after this time will be included.',
	required: true,
	default: '',
};