interface email_login {
    email: string;
    password: string;
};

interface mobile_login {
    mobile: string;
    otp: string;
};

const login = async(payload: email_login) => {
    try {
        return {
            error: false,
            code: 200,
            result: payload,
            message: 'success'
        };
    } catch(e: any) {
        console.log('error while processing data at controller', e);
        return {
            error: true,
            code: 500,
            result: null,
            message: 'error occured'
        };
    }
}

export default {
    login,
}