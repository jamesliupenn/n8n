import {
	IHookFunctions,
	IWebhookFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	NodeApiError,
	NodeOperationError,
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
		subtitle: '={{$parameter["events"]}}',
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

	// @ts-ignore (because of request)
	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const credentials = this.getCredentials('onfleetApi') as IDataObject;
				const encodedApiKey = Buffer.from(`${credentials.apiKey}:`).toString('base64');

				if (webhookData.webhookId === undefined) {
					// No webhook id is set so no webhook can exist
					return false;
				}

				// Webhook got created before so check if it still exists
				const endpoint = `/webhooks/${webhookData.webhookId}`;

				try {
					await onfleetApiRequest.call(this, 'GET', encodedApiKey, endpoint);
				} catch (error) {
					if (error.httpCode === '404') {
						// Webhook does not exist
						delete webhookData.webhookId;
						delete webhookData.webhookEvents;

						return false;
					}

					// Some error occured
					throw error;
				}

				// If it did not error then the webhook exists
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const credentials = this.getCredentials('onfleetApi') as IDataObject;
				const encodedApiKey = Buffer.from(`${credentials.apiKey}:`).toString('base64');

				if (webhookUrl.includes('//localhost')) {
					throw new NodeOperationError(this.getNode(), 'The Webhook can not work on "localhost". Please, either setup n8n on a custom domain or start with "--tunnel"!');
				}

				const events = this.getNodeParameter('events', []);

				const endpoint = `/webhooks`;

				const body = {
					name: 'web',
					config: {
						url: webhookUrl,
						content_type: 'json',
						// secret: '...later...',
						insecure_ssl: '1', // '0' -> not allow inscure ssl | '1' -> allow insercure SSL
					},
					events,
					active: true,
				};

				const webhookData = this.getWorkflowStaticData('node');

				let responseData;
				try {
					responseData = await onfleetApiRequest.call(this, 'POST', encodedApiKey, endpoint, body);
				} catch (error) {
					if (error.httpCode === '422') {
						// Webhook exists already

						// Get the data of the already registered webhook
						responseData = await onfleetApiRequest.call(this, 'GET', encodedApiKey, endpoint);

						for (const webhook of responseData as IDataObject[]) {
							if ((webhook!.config! as IDataObject).url! === webhookUrl) {
								// Webhook got found
								if (JSON.stringify(webhook.events) === JSON.stringify(events)) {
									// Webhook with same events exists already so no need to
									// create it again simply save the webhook-id
									webhookData.webhookId = webhook.id as string;
									webhookData.webhookEvents = webhook.events as string[];
									return true;
								}
							}
						}

						throw new NodeOperationError(this.getNode(), 'A webhook with the identical URL probably exists already. Please delete it manually on Github!');
					}

					throw error;
				}

				if (responseData.id === undefined || responseData.active !== true) {
					// Required data is missing so was not successful
					throw new NodeApiError(this.getNode(), responseData, { message: 'Github webhook creation response did not contain the expected data.' });
				}

				webhookData.webhookId = responseData.id as string;
				webhookData.webhookEvents = responseData.events as string[];

				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const credentials = this.getCredentials('onfleetApi') as IDataObject;
				const encodedApiKey = Buffer.from(`${credentials.apiKey}:`).toString('base64');

				if (webhookData.webhookId !== undefined) {
					const endpoint = `/webhooks/${webhookData.webhookId}`;
					const body = {};

					try {
						await onfleetApiRequest.call(this, 'DELETE', encodedApiKey, endpoint);
					} catch (error) {
						return false;
					}

					// Remove from the static workflow data so that it is clear
					// that no webhooks are registred anymore
					delete webhookData.webhookId;
					delete webhookData.webhookEvents;
				}

				return true;
			},
		},
	};


	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();

		// Check if the webhook is only the ping from Github to confirm if it workshook_id
		if (bodyData.hook_id !== undefined && bodyData.action === undefined) {
			// Is only the ping and not an actual webhook call. So return 'OK'
			// but do not start the workflow.

			return {
				webhookResponse: 'OK',
			};
		}

		// Is a regular webhoook call

		// TODO: Add headers & requestPath
		const returnData: IDataObject[] = [];

		returnData.push(
			{
				body: bodyData,
				headers: this.getHeaderData(),
				query: this.getQueryData(),
			},
		);

		return {
			workflowData: [
				this.helpers.returnJsonArray(returnData),
			],
		};
	}
}