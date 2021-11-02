import {
	INodeProperties
} from 'n8n-workflow';

export const serviceTimeDisplay: INodeProperties = {
	displayName: 'Service Time',
	name: 'serviceTime',
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
	description: 'The number of minutes to be spent by the worker on arrival at this task destination, for route optimization purposes.',
	required: false,
	default: 0,
};