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
          // Node properties which the user gets displayed and
          // can change on the node.
      ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
      return [[]];
  }
}
