const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET;

function encode(obj) {
    console.log(obj, 'obj<<<<');
    console.log('masuk jwt <<<<');
    return jwt.sign(obj, secretKey);
}

function decode(accessToken) {
    try {
        var decoded = jwt.verify(accessToken, secretKey);
        return decoded;
    } catch (err) {
        return err;
    }
}

module.exports = { encode, decode };
