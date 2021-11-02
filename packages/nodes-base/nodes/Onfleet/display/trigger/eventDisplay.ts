import {
	INodeProperties
} from 'n8n-workflow';

export const eventDisplay: INodeProperties = {
	displayName: 'Event',
	name: 'event',
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
		{
			name: 'Worker Created',
			value: 'workerCreated',
		},
		{
			name: 'Worker Deleted',
			value: 'workerDeleted',
		},
	],
	required: true,
	default: [],
	description: 'The event to listen to.',
};