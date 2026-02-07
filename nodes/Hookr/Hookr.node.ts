import {
	NodeApiError,
	NodeConnectionTypes,
	type IExecuteFunctions,
	type IHttpRequestMethods,
	type IHttpRequestOptions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
	type JsonObject,
} from 'n8n-workflow';

export class Hookr implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Hookr',
		name: 'hookr',
		icon: 'file:hookr-round.svg',
		group: ['input'],
		version: 1,
		description: 'Send push notifications to your iOS and Android devices using Hookr app',
		credentials: [
			{
				name: 'hookrApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.hookr.app/n8n',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		defaults: {},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Send Push Notification',
						displayName: 'Send Push Notification',
						value: 'sendPush',
						action: 'Send a push notification',
						description: 'Receive notifications on your iOS or Android devices',
					},
				],
				default: 'sendPush',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				required: true,
				description: 'Notification title',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				required: true,
				description: 'Notification message',
			},
			{
				displayName: 'Action URL',
				name: 'actionUrl',
				type: 'string',
				default: '',
				description: 'Optional URL to open when the notification is tapped',
			},
			{
				displayName: 'Time Sensitive',
				name: 'isTimeSensitive',
				type: 'boolean',
				default: false,
				description: 'Whether the notification is time sensitive',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const results: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const title = this.getNodeParameter('title', i) as string;
			const message = this.getNodeParameter('message', i) as string;
			const actionUrl = this.getNodeParameter('actionUrl', i) as string;
			const isTimeSensitive = this.getNodeParameter('isTimeSensitive', i) as boolean;

			const options: IHttpRequestOptions = {
				method: 'POST' as IHttpRequestMethods,
				baseURL: 'https://api.hookr.app/n8n',
				url: '/push',
				body: {
					title,
					message,
					actionUrl,
					isTimeSensitive,
				},
				json: true,
			};

			try {
				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'hookrApi',
					options,
				);

				results.push({ json: response as JsonObject });
			} catch (error) {
				this.logger.error(`Error sending push notification: ${JSON.stringify(error)}`);

				const err = error as JsonObject & {
					message?: string;
					description?: string | string[];
					response?: { statusCode?: number; body?: { message?: string | string[] } };
					context?: { data?: { message?: string | string[]; statusCode?: number } };
				};
				const statusCode = err?.response?.statusCode ?? err?.context?.data?.statusCode;
				const bodyMessage =
					err?.response?.body?.message ??
					err?.context?.data?.message ??
					err?.description ??
					err?.message;
				const errorMessage = Array.isArray(bodyMessage)
					? bodyMessage.join(', ')
					: bodyMessage || 'Unknown Error';

				throw new NodeApiError(this.getNode(), err, {
					message: `[${statusCode ?? 'Unknown'}] ${errorMessage}`,
				});
			}
		}

		return [results];
	}
}
