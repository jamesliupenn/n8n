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

export class Onfleet implements INodeType {
  description: INodeTypeDescription = {
      displayName: 'Onfleet',
      name: 'onfleet',
      icon: 'file:onfleet.png',
      group: ['transform'],
      version: 1,
      description: 'Onfleet API',
      defaults: {
          name: 'Onfleet',
          color: '#AA81F3',
      },
      inputs: ['main'],
      outputs: ['main'],
      credentials: [
      ],
      properties: [
        // List of option resources
        {
          displayName: 'Resource',
          name: 'resource',
          type: 'options',
          options: [
            {
              name: 'Admin',
              value: 'admin',
            },
            {
              name: 'Recipient',
              value: 'recipient',
            },
            {
              name: 'Task',
              value: 'task',
            },
            {
              name: 'Team',
              value: 'team',
            },
            {
              name: 'Worker',
              value: 'worker',
            }
          ],
          default: 'task',
          description: 'The resource to perform operations on.'
        },
        // Operation Options: Admin
        {
          displayName: 'Operation',
          name: 'operation',
          type: 'options',
          displayOptions: {
            show: {
              resource: [
                'admin'
              ]
            }
          },
          options: [
            {
              name: 'Create',
              value: 'create',
              description: 'Create new Onfleet admin'
            },
            {
              name: 'Delete',
              value: 'delete',
              description: 'Delete an Onfleet admin'
            },
            {
              name: 'List',
              value: 'list',
              description: 'List all Onfleet admins'
            },
            {
              name: 'Update',
              value: 'update',
              description: 'Update an Onfleet admin'
            },
          ],
          default: 'list'
        },
        // Operation Options: Recipient
        {
          displayName: 'Operation',
          name: 'operation',
          type: 'options',
          displayOptions: {
            show: {
              resource: [
                'recipient'
              ]
            }
          },
          options: [
            {
              name: 'Create',
              value: 'create',
              description: 'Create new Onfleet recipient'
            },
            {
              name: 'Lookup',
              value: 'lookup',
              description: 'Look up a specific Onfleet recipient'
            },
            {
              name: 'Update',
              value: 'update',
              description: 'Update an Onfleet recipient'
            },
          ],
          default: 'lookup'
        },
        // Operation Options: Task
        {
          displayName: 'Operation',
          name: 'operation',
          type: 'options',
          displayOptions: {
            show: {
              resource: [
                'task'
              ]
            }
          },
          options: [
            {
              name: 'Clone',
              value: 'clone',
              description: 'Clone an Onfleet task'
            },
            {
              name: 'Complete',
              value: 'complete',
              description: 'Force-complete a started Onfleet task'
            },
            {
              name: 'Create',
              value: 'create',
              description: 'Create new Onfleet task'
            },
            {
              name: 'Delete',
              value: 'delete',
              description: 'Delete an Onfleet task'
            },
            {
              name: 'Lookup',
              value: 'lookup',
              description: 'Look up a specific Onfleet task'
            },
            {
              name: 'Update',
              value: 'update',
              description: 'Update an Onfleet task'
            },

          ],
          default: 'lookup'
        },
        // Operation Options: Team
        {
          displayName: 'Operation',
          name: 'operation',
          type: 'options',
          displayOptions: {
            show: {
              resource: [
                'team'
              ]
            }
          },
          options: [
            {
              name: 'Create',
              value: 'create',
              description: 'Create new Onfleet team'
            },
            {
              name: 'Delete',
              value: 'delete',
              description: 'Delete an Onfleet team'
            },
            {
              name: 'List',
              value: 'list',
              description: 'List Onfleet teams'
            },
            {
              name: 'Lookup',
              value: 'lookup',
              description: 'Look up a specific Onfleet team'
            },
            {
              name: 'Update',
              value: 'update',
              description: 'Update an Onfleet team'
            },

          ],
          default: 'lookup'
        },
        // Operation Options: Task
        {
          displayName: 'Operation',
          name: 'operation',
          type: 'options',
          displayOptions: {
            show: {
              resource: [
                'worker'
              ]
            }
          },
          options: [
            {
              name: 'Create',
              value: 'create',
              description: 'Create new Onfleet worker'
            },
            {
              name: 'Delete',
              value: 'delete',
              description: 'Delete an Onfleet worker'
            },
            {
              name: 'Lookup',
              value: 'lookup',
              description: 'Look up a specific Onfleet worker'
            },
            {
              name: 'Lookup Schedule',
              value: 'lookupSchedule',
              description: 'Look up a specific Onfleet worker schedule'
            },
            {
              name: 'Update',
              value: 'update',
              description: 'Update an Onfleet worker'
            },
          ],
          default: 'lookup'
        },
        // ID
        {
          displayName: 'ID',
          name: 'id',
          type: 'string',
          displayOptions: {
            show: {
              resource: [
                'admin',
                'recipient',
                'task',
                'team',
                'worker'
              ]
            },
            hide: {
              operation: [
                'delete',
                'list'
              ]
            }
          },
          default: '',
          required: true,
          description: 'The ID of the object for lookup'
        }
      ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
      return [[]];
  }
}
