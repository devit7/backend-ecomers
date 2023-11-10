require('dotenv').config();

const generateToken = () => {
    const xendit_api_keys =  process.env.XENDIT_KEY+':';
    const base64 = Buffer.from(xendit_api_keys).toString('base64');
    return base64;
}
console.log(generateToken());

exports.xenditHeaders = {
    'Authorization' : 'Basic '+generateToken(),
    'Content-Type' : 'application/json'
}

