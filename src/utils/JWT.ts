import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

const encrypt = (password: string) => 
    new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (error, salt: string) => {
            if(error) reject({error: error, result: null})
            bcrypt.hash(password, salt, (err, hash) => {
                if(!err) {
                    password = hash;
                    resolve({error: false, result: hash});
                } else {
                    reject({error: err, result: null});
                }
            });
        })
    });

const compare = (password: string, user_pass: string) =>
    new Promise((resolve) => {
        bcrypt.compare(password, user_pass, (error: any, result: any) => {
            if(result) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });

export default {
    create,
    verify,
    encrypt,
    compare,
}