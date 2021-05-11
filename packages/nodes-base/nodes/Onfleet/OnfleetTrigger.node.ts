import {
	IHookFunctions,
	IWebhookFunctions,
} from 'n8n-core';

import {
	IDataObject,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';

import {
	onfleetApiRequest,
} from './GenericFunctions';


export class OnfleetTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Onfleet Trigger',
		name: 'onfleetTrigger',
		icon: 'file:onfleet.png',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["eventId"]}}',
		description: 'Starts the workflow when Onfleet events occur.',
		defaults: {
			name: 'Onfleet Trigger',
			color: '#AA81F3',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'onfleetApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
			{
				name: 'validate',
				httpMethod: 'GET',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'options',
				options: [
					{
						name: 'Task Started',
						value: 'taskStarted',
					},
					{
						name: 'Task Eta',
						value: 'taskEta',
					},
					{
						name: 'Task Arrival',
						value: 'taskArrival',
					},
					{
						name: 'Task Completed',
						value: 'taskCompleted',
					},
					{
						name: 'Task Failed',
						value: 'taskFailed',
					},
					{
						name: 'Worker Duty',
						value: 'workerDuty',
					},
					{
						name: 'Task Created',
						value: 'taskCreated',
					},
					{
						name: 'Task Updated',
						value: 'taskUpdated',
					},
					{
						name: 'Task Deleted',
						value: 'taskDeleted',
					},
					{
						name: 'Task Assigned',
						value: 'taskAssigned',
					},
					{
						name: 'Task Unassigned',
						value: 'taskUnassigned',
					},
					{
						name: 'Task Delayed',
						value: 'taskDelayed',
					},
					{
						name: 'Task Cloned',
						value: 'taskCloned',
					},
					{
						name: 'Sms Recipient Response Missed',
						value: 'smsRecipientResponseMissed',
					},
				],
				required: true,
				default: [],
				description: 'The event to listen to.',
			},
		],
	};

	// methods = {
	// 	loadOptions: {
	// 		// Get all the event types to display them to user so that he can
	// 		// select them easily
	// 		async getEvents(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	// 			const returnData: INodePropertyOptions[] = [];
	// 			// const hooks = await keapApiRequest.call(this, 'GET', '/hooks/event_keys');
	// 			// for (const hook of hooks) {
	// 			// 	const hookName = hook;
	// 			// 	const hookId = hook;
	// 			// 	returnData.push({
	// 			// 		name: capitalCase((hookName as string).replace('.', ' ')),
	// 			// 		value: hookId as string,
	// 			// 	});
	// 			// }
	// 			return returnData;
	// 		},
	// 	},
	// };

	// @ts-ignore (because of request)
	webhookMethods = {};
}