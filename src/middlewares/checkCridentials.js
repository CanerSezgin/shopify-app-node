require("dotenv").config();
const { ErrorHandler } = require('../lib/error');

const credentialFields = [
    'SHOPIFY_API_KEY',
    'SHOPIFY_API_SECRET',
    'HOST',
    'SHOP',
    'SCOPES',
]
class Credential {
    constructor(data){
        credentialFields.forEach(field => {
            this[field] = data[field]
        });
    }
    anyMissingValue(){
        return Object.keys(this).some(key => !this[key])
    }

}
const credential = new Credential(process.env)
module.exports = (req, res, next) => {
    if(credential.anyMissingValue()){
        throw new ErrorHandler(400, {
            message: 'Missing Credentials',
            details: 'You need to set these under process.env',
            fields: credentialFields
        }, true);
    }
    console.log("next -> credential")
    res.locals.credential = credential
    next()
}