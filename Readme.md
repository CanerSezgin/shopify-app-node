# Shopify Node/Express APP Starter Boilerplate

### Requirements
- ngrok secure introspectable tunnels to localhost webhook development tool and debugging tool.
- If you don’t have one, [create a Shopify partner account](https://partners.shopify.com/signup).
- If you don’t have one, [create a Development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) where you can install and test your app.

### Preparation
0. Clone this repo
1. Install **ngrok**  `npm install ngrok -g`
2. Start **ngrok**  `ngrok http 3000`
3. Create App on shopify partners dashboard.
-> Apps -> Create App
-> Select Public app
-> Enter App Name _{ Your App Name }_
-> Enter App URL _{ https://YOUR_NGROK_HOST_ADDRESS }_
-> Enter Whitelist _{ https://YOUR_NGROK_HOST_ADDRESS/shopify/callback}_
4. Create **.env**
-> By taking a look at [.env.example](.env.example) file, fill your own `.env` file.
`SHOPIFY_API_KEY`: can be found under app settings dasboard on shopify partner. <br>
`SHOPIFY_API_SECRET`: can be found under app settings dasboard on shopify partner. <br>
`SHOP`: Create a demo shop and get the domain of that shop. <br>
`HOST`: ngrok address <br>
`SCOPES`: [scope list](https://shopify.dev/docs/admin-api/access-scopes)

### Start Server
`npm run dev`

### To Install App in Your Demo Shop
- Go to `http://localhost:3000/shopify`
- Accept giving permission

## License
[MIT](LICENSE)

##
Good Luck with your apps !