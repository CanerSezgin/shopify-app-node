require("dotenv").config();

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
        return res.status(400).json({
            message: 'Missing Credentials',
            details: 'You need to set these under process.env',
            fields: credentialFields
        })
    }
    res.locals.credential = credential
    next()
}