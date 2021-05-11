import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	OptionsWithUri,
} from 'request';

import {
	onfleetApiRequest,
} from './GenericFunctions';

export class Onfleet implements INodeType {
	description: INodeTypeDescription = {
			displayName: 'Onfleet',
			name: 'onfleet',
			icon: 'file:onfleet.png',
			group: ['input'],
			version: 1,
			description: 'Onfleet API',
			defaults: {
					name: 'Onfleet',
					color: '#AA81F3',
			},
			inputs: ['main'],
			outputs: ['main'],
			credentials: [
				{
					name: 'onfleetApi',
					required: true,
				},
			],
			properties: [
				// List of option resources
				{
					displayName: 'Resource',
					name: 'resource',
					type: 'options',
					options: [
						{
							name: 'Admins',
							value: 'admins',
						},
						{
							name: 'Recipients',
							value: 'recipients',
						},
						{
							name: 'Tasks',
							value: 'tasks',
						},
						{
							name: 'Teams',
							value: 'teams',
						},
						{
							name: 'Workers',
							value: 'workers',
						},
					],
					default: 'tasks',
					description: 'The resource to perform operations on.',
				},
				// Operation Options: Admin
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'admins',
							],
						},
					},
					options: [
						{
							name: 'Create',
							value: 'create',
							description: 'Create new Onfleet admin',
						},
						{
							name: 'Delete',
							value: 'delete',
							description: 'Delete an Onfleet admin',
						},
						{
							name: 'List',
							value: 'list',
							description: 'List all Onfleet admins',
						},
						{
							name: 'Update',
							value: 'update',
							description: 'Update an Onfleet admin',
						},
					],
					default: 'list',
				},
				// Operation Options: Recipient
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'recipients',
							],
						},
					},
					options: [
						{
							name: 'Create',
							value: 'create',
							description: 'Create new Onfleet recipient',
						},
						{
							name: 'Lookup',
							value: 'lookup',
							description: 'Look up a specific Onfleet recipient',
						},
						{
							name: 'Update',
							value: 'update',
							description: 'Update an Onfleet recipient',
						},
					],
					default: 'lookup',
				},
				// Operation Options: Task
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'tasks',
							],
						},
					},
					options: [
						{
							name: 'Clone',
							value: 'clone',
							description: 'Clone an Onfleet task',
						},
						{
							name: 'Complete',
							value: 'complete',
							description: 'Force-complete a started Onfleet task',
						},
						{
							name: 'Create',
							value: 'create',
							description: 'Create new Onfleet task',
						},
						{
							name: 'Delete',
							value: 'delete',
							description: 'Delete an Onfleet task',
						},
						{
							name: 'Lookup',
							value: 'lookup',
							description: 'Look up a specific Onfleet task',
						},
						{
							name: 'Update',
							value: 'update',
							description: 'Update an Onfleet task',
						},

					],
					default: 'lookup',
				},
				// Operation Options: Team
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'teams',
							],
						},
					},
					options: [
						{
							name: 'Create',
							value: 'create',
							description: 'Create new Onfleet team',
						},
						{
							name: 'Delete',
							value: 'delete',
							description: 'Delete an Onfleet team',
						},
						{
							name: 'List',
							value: 'list',
							description: 'List Onfleet teams',
						},
						{
							name: 'Lookup',
							value: 'lookup',
							description: 'Look up a specific Onfleet team',
						},
						{
							name: 'Update',
							value: 'update',
							description: 'Update an Onfleet team',
						},

					],
					default: 'lookup',
				},
				// Operation Options: Worker
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'workers',
							],
						},
					},
					options: [
						{
							name: 'Create',
							value: 'create',
							description: 'Create new Onfleet worker',
						},
						{
							name: 'Delete',
							value: 'delete',
							description: 'Delete an Onfleet worker',
						},
						{
							name: 'List',
							value: 'list',
							description: 'List all Onfleet workers',
						},
						{
							name: 'Lookup',
							value: 'lookup',
							description: 'Look up a specific Onfleet worker',
						},
						{
							name: 'Lookup Schedule',
							value: 'lookupSchedule',
							description: 'Look up a specific Onfleet worker schedule',
						},
						{
							name: 'Update',
							value: 'update',
							description: 'Update an Onfleet worker',
						},
					],
					default: 'lookup',
				},
				// ID
				{
					displayName: 'ID',
					name: 'id',
					type: 'string',
					displayOptions: {
						show: {
							resource: [
								'admins',
								'recipients',
								'tasks',
								'teams',
								'workers',
							],
						},
						hide: {
							operation: [
								'create',
								'list',
							],
						},
					},
					default: '',
					required: true,
					description: 'The ID of the object for lookup',
				},
				// Json Body for entity updates
				{
					displayName: 'Update Body',
					name: 'updateBody',
					type: 'json',
					displayOptions: {
						show: {
							resource: [
								'admins',
								'recipients',
								'tasks',
								'teams',
								'workers',
							],
							operation: [
								'update',
							],
						},
					},
					default: '{}',
					required: true,
					description: 'The body to update the entity with.',
				},
				// Task Creation Body
				{
					displayName: 'PickupTask',
					name: 'pickupTask',
					type: 'boolean',
					displayOptions: {
						show: {
							resource: [
								'tasks',
							],
							operation: [
								'create',
							],
						},
					},
					description: 'Is this a pickup task?',
					required: true,
					default: '',
				},
				{
					displayName: 'Quantity',
					name: 'quantity',
					type: 'number',
					displayOptions: {
						show: {
							resource: [
								'tasks',
							],
							operation: [
								'create',
							],
						},
					},
					description: 'Quantity of the task',
					required: false,
					default: 0,
				},
				{
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
							],
						},
					},
					description: 'The number of minutes to be spent by the worker on arrival at this task destination, for route optimization purposes.',
					required: false,
					default: 0,
				},
				{
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
							],
						},
					},
					description: 'Task notes.',
					required: false,
					default: '',
				},
				{
					displayName: 'CompleteAfter',
					name: 'completeAfter',
					type: 'number',
					displayOptions: {
						show: {
							resource: [
								'tasks',
							],
							operation: [
								'create',
							],
						},
					},
					description: 'Unix timestamp for the earliest time the task should be completed.',
					required: false,
					default: null,
				},
				{
					displayName: 'CompleteBefore',
					name: 'completeBefore',
					type: 'number',
					displayOptions: {
						show: {
							resource: [
								'tasks',
							],
							operation: [
								'create',
							],
						},
					},
					description: 'Unix timestamp for the latest time the task should be completed.',
					required: false,
					default: null,
				},
				// Task Creation Additional Fields
				{
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
				},
				// Task Clone 
				{
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
				},
			],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let responseData;
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		//Get credentials the user provided for this node
		const credentials = this.getCredentials('onfleetApi') as IDataObject;
		const encodedApiKey = Buffer.from(`${credentials.apiKey}:`).toString('base64');

		// CRUD - Create entity
		if (operation === 'create') {
			// TODO: pull in options
			const body = {};
			responseData = await onfleetApiRequest.call(this, 'PUT', encodedApiKey, resource, body);
		}
		else if (operation === 'clone') {
			const id = this.getNodeParameter('id', 0) as string;
			const path = `${resource}/${id}/clone`;
			// TODO: pull in options
			responseData = await onfleetApiRequest.call(this, 'POST', encodedApiKey, path);
		}
		// CRUD - List all entities
		else if (operation === 'list') {
			responseData = await onfleetApiRequest.call(this, 'GET', encodedApiKey, resource);
		}
		// CRUD - Get entity by ID
		else if (operation === 'lookup') {
			const id = this.getNodeParameter('id', 0) as string;
			const path = `${resource}/${id}`;
			responseData = await onfleetApiRequest.call(this, 'GET', encodedApiKey, path);
		}
		// CRUD - Update entity by ID
		else if (operation === 'update') {
			const id = this.getNodeParameter('id', 0) as string;
			const path = `${resource}/${id}`;
			const body = this.getNodeParameter('updateBody', 0) as object;
			responseData = await onfleetApiRequest.call(this, 'PUT', encodedApiKey, path, body);
		}
		// CRUD - Delete entity by ID
		else if (operation === 'delete') {
			const id = this.getNodeParameter('id', 0) as string;
			const path = `${resource}/${id}`;
			responseData = await onfleetApiRequest.call(this, 'DELETE', encodedApiKey, path);
		}
	
		// Map data to n8n data
		return [this.helpers.returnJsonArray(responseData)];
	}
		
}
