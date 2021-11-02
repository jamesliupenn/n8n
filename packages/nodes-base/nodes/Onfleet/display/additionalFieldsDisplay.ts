import {
	INodeProperties
} from 'n8n-workflow';

export const additionalFieldsDisplay: INodeProperties = {
	displayName: 'Additional Fields',
	name: 'additionalFields',
	type: 'collection',
	placeholder: 'Add Fields',
	default: {},
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
	options: [
		{
			displayName: 'Merchant ID',
			name: 'merchant',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Executor ID',
			name: 'executor',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Recipient Name Override',
			name: 'recipientName',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Recipient Notes Override',
			name: 'recipientNotes',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Recipient Skip SMS Notifications Override',
			name: 'recipientSkipSMSNotifications',
			type: 'boolean',
			default: '',
		},
		{
			displayName: 'Use Merchant For Proxy Override',
			name: 'useMerchantForProxy',
			type: 'boolean',
			default: '',
		},
	],
};