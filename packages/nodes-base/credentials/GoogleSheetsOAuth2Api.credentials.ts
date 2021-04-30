import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

// https://developers.google.com/drive/api/v3/about-auth

const scopes = [
	'https://www.googleapis.com/auth/drive',
	'https://www.googleapis.com/auth/spreadsheets',
];

export class GoogleSheetsOAuth2Api implements ICredentialType {
	name = 'googleSheetsOAuth2Api';
	extends = [
		'googleOAuth2Api',
	];
	displayName = 'Google Sheets OAuth2 API';
	documentationUrl = 'google';
	properties = [
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden' as NodePropertyTypes,
			default: scopes.join(' '),
		},
	];
}
