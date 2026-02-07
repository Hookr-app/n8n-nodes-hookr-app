import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class HookrApi implements ICredentialType {
	name = 'hookrApi';

	displayName = 'Hookr API';

	icon: Icon = 'file:../icons/hookr-round.svg';

	documentationUrl = 'https://docs.hookr.app/integrations';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your Hookr API key. You can find it in your Hookr app on settings tab.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.hookr.app/n8n',
			url: '/whoami',
			method: 'GET',
		},
	};
}
