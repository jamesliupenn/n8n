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

// tslint:disable:indent

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
							name: 'Create Pickup/Dropoff Combo',
							value: 'createCombo',
							description: 'Create new Onfleet pickup/dropoff tasks',
						},
						{
							name: 'Delete',
							value: 'delete',
							description: 'Delete an Onfleet task',
						},
						{
							name: 'List',
							value: 'list',
							description: 'List Onfleet tasks',
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
					default: false,
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
					type: 'dateTime',
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
					description: 'T he earliest time the task should be completed.',
					required: false,
					default: null,
				},
				{
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
							],
						},
					},
					description: 'The latest time the task should be completed.',
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
				// Task Creation for Pickup/Dropoff Combo
				{
					displayName: 'PickupNotes',
					name: 'pickupNotes',
					type: 'string',
					displayOptions: {
						show: {
							resource: [
								'tasks',
							],
							operation: [
								'createCombo',
							],
						},
					},
					description: 'Pickup task notes',
					required: false,
					default: '',
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
				// Task List Fields
				{
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
				},
				{
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
				},
				{
					displayName: 'State',
					name: 'state',
					type: 'string',
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
					description: 'The state of the tasks.',
					required: false,
					default: null,
				},
        {
					displayName: 'LastId',
					name: 'lastId',
					type: 'string',
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
					description: 'The last Id to walk the paginated response.',
					required: false,
					default: null,
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
			const cAdate = new Date(this.getNodeParameter('completeAfter', 0) as Date);
			const cBdate = new Date(this.getNodeParameter('completeBefore', 0) as Date);
			const body = {
				pickupTask		: this.getNodeParameter('pickupTask', 0) as boolean,
				quantity  		: this.getNodeParameter('quantity', 0) as number,
				serviceTime		: this.getNodeParameter('serviceTime', 0) as number,
				notes					: this.getNodeParameter('notes', 0) as string,
				completeAfter : cAdate.getTime(),
				completeBefore: cBdate.getTime(),
			};
			console.log(body);
			// responseData = await onfleetApiRequest.call(this, 'PUT', encodedApiKey, resource, body);
		}
		else if (operation === 'createCombo') {

		}
		else if (operation === 'clone') {
			const id = this.getNodeParameter('id', 0) as string;
			const path = `${resource}/${id}/clone`;
			// TODO: pull in options
			responseData = await onfleetApiRequest.call(this, 'POST', encodedApiKey, path);
		}
		// CRUD - List all entities
		else if (operation === 'list') {
			if (resource === 'tasks') {
        let queryParams;
        // Getting the required field
				const fromInUnix = new Date(this.getNodeParameter('from', 0) as Date).getTime();
        queryParams = `?from=${fromInUnix}`;
        // Check for optional fields
        const state = this.getNodeParameter('state', 0) as number;
        if (state) queryParams += `&state=${state}`;
        const toInUnix = new Date(this.getNodeParameter('to', 0) as Date).getTime();
        if (toInUnix) queryParams += `&to=${toInUnix}`;

        const path = `${resource}/all${queryParams}`;
        console.log(path);

        responseData = await onfleetApiRequest.call(this, 'GET', encodedApiKey, path);
			} else {
        responseData = await onfleetApiRequest.call(this, 'GET', encodedApiKey, resource);
      }
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
