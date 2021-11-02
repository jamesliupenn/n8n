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

import { 
	adminOperations, 
	recipientOperations, 
	taskOperations, 
	teamOperations, 
	workerOperations 
} from './operations/index';
import { 
	additionalFieldsDisplay,
	completeAfterDisplay,
	completeBeforeDisplay,
	fromDisplay,
	idDisplay, 
	lastIdDisplay,
	notesDisplay,
	pickupNotesDisplay,
	pickupTaskDisplay,
	quantityDisplay, 
	serviceTimeDisplay,
	stateDisplay,
	taskCloneOptionsDisplay,
	toDisplay,
	updateBodyDisplay, 
} from './display/index';

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
				// Operations
				adminOperations,
				recipientOperations,
				taskOperations,
				teamOperations,
				workerOperations,
				// Display Fields
				idDisplay,
				updateBodyDisplay,
				// Task Creation Body
				pickupTaskDisplay,
				quantityDisplay,
				serviceTimeDisplay,
				notesDisplay, // Dropoff notes
				pickupNotesDisplay, // Pickup notes
				completeAfterDisplay,
				completeBeforeDisplay,
				// Task Creation Additional Fields
				additionalFieldsDisplay,
				// Task Clone 
				taskCloneOptionsDisplay,
				// Task List Fields
				fromDisplay,
				toDisplay,
				stateDisplay,
        lastIdDisplay,
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
			const cAdate = new Date(this.getNodeParameter('completeAfter', 0) as Date);
			const cBdate = new Date(this.getNodeParameter('completeBefore', 0) as Date);
			const body = {
				quantity  		: this.getNodeParameter('quantity', 0) as number,
				serviceTime		: this.getNodeParameter('serviceTime', 0) as number,
				notes					: this.getNodeParameter('notes', 0) as string,
				completeAfter : cAdate.getTime(),
				completeBefore: cBdate.getTime(),
			}; 

			console.log(body);
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
