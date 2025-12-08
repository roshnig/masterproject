import {Amplify} from 'aws-amplify';

const env = import.meta.env;

Amplify.configure({
    Auth:{
        Cognito: {
            userPoolId: 'eu-west-2_test',
            userPoolClientId: 'testclientid',
            loginWith:{
                email: true
            }
        }
    }
})