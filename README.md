# n8n-nodes-hookr-app

This is an n8n community node. It lets you use Hookr in your n8n workflows.

Hookr sends mobile push notifications to your iOS or Android devices for critical alerts and updates.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- **Send Push**: Send a push notification with:
  - **Title** (required)
  - **Message** (required)
  - **Action URL** (optional)
  - **Time Sensitive** (optional)

## Credentials

This node uses the Hookr API key for authentication.

1. Download the app:
   - [App Store (iOS)](https://apps.apple.com/us/app/hookr/id6753193912)
   - [Google Play (Android)](https://play.google.com/store/apps/details?id=app.hookr)
2. Open the Hookr app, register, and copy your API key from **Settings**.
3. In n8n, create a **Hookr API** credential and paste the API key.

**Pricing & limits**
- **Free tier**: 200 push notifications per month.
- **Personal use**: Each API key is tied to your individual account and device.

## Compatibility

Tested with the latest n8n LTS (2.6.4).

## Usage

- Use **Action URL** to open a specific page, dashboard, or app when a notification is tapped.
- Enable **Time Sensitive** for urgent alerts that can bypass Do Not Disturb.
- The free tier includes 200 notifications per month, which is suitable for personal alerts.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Hookr website](https://hookr.app/)
- [Hookr documentation](https://docs.hookr.app/)
- [Terms of Service](https://hookr.app/terms-of-use)

## Version history

- **0.1.0**: Initial release.
