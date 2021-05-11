import {
	OptionsWithUri,
} from 'request';

import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
} from 'n8n-core';

import {
	IDataObject, NodeApiError
} from 'n8n-workflow';

export async function onfleetApiRequest(this: IWebhookFunctions | IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions, method: string, apikey: string, resource: string, body: any = {}, qs: IDataObject = {}, uri?: string, headers: IDataObject = {}, option: IDataObject = {}): Promise<any> { // tslint:disable-line:no-any
	const options: OptionsWithUri = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Basic ${apikey}`,
		},
		method,
		body,
		qs,
		uri: uri || `https://onfleet.com/api/v2/${resource}`,
		json: true,
	};
	try {
		//@ts-ignore
		return await this.helpers.request(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}
