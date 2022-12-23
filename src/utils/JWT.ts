import jwt = require("jsonwebtoken");

const tokenSecret: string = 'thisisasecretjwttokencreatebymewhichonlyiknow';
const expiryTime: string = '7d';
let cert: Buffer;

interface TestObject {
    foo: string;
}

const create = (payload: any) => {
    jwt.sign(
        payload,
        tokenSecret,
        {
            expiresIn: expiryTime
        }
    )
};

const verify = (token: string, callback: any) => {
    jwt.verify(
        token,
        tokenSecret,
        {},
        callback
    );
};

export default {
    create,
    verify,
}