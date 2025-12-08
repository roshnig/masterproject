import {Amplify} from 'aws-amplify';

const env = import.meta.env;

Amplify.configure({
    Auth:{
        Cognito: {
            userPoolId: env.VITE_COGNITO_USER_POOL_ID,
            userPoolClientId: env.VITE_COGNITO_USER_POOL_CLIENT_ID,
            loginWith:{
                email: true
            }
        }
    }
})