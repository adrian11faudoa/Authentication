const crypto = require("crypto");
const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

const hash = crypto.createHash('sha256');

const myData = {
    fisrtName: 'Adrian',
    lasName: 'Fau',
    socialSecurityNumber: 'Nope, This form of cryptography does not hide the data'
};

const myDataString = JSON.stringify(myData);

hash.update(myDataString);

const hashedData = hash.digest('hex');

const senderPrivateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');

const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData);

const packageOfDataToSend = {
    algorithm: 'sha256',
    originalData: myData,
    signedAndEncryptedData: signedMessage
};

module.exports.packageOfDataToSend = packageOfDataToSend;
