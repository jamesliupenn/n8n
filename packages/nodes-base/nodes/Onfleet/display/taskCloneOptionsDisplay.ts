import {
	INodeProperties
} from 'n8n-workflow';

export const taskCloneOptionsDisplay: INodeProperties = {
	displayName: 'Options',
	name: 'options',
	type: 'collection',
	placeholder: 'Add options',
	default: {},
	displayOptions: {
		show: {
			resource: [
				'tasks',
			],
			operation: [
				'clone',
			],
		},
	},
	options: [
		{
			displayName: 'Include Metadata',
			name: 'includeMetadata',
			type: 'boolean',
			default: null,
		},
		{
			displayName: 'Include Barcodes',
			name: 'includeBarcodes',
			type: 'boolean',
			default: null,
		},
		{
			displayName: 'Include Dependencies',
			name: 'includeDependencies',
			type: 'boolean',
			default: null,
		},
		{
			displayName: 'Overrides',
			name: 'overrides',
			type: 'json',
			default: null,
		},
	],
};