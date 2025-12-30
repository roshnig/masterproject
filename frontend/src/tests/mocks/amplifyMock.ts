import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "eu-west-2_test",
      userPoolClientId: "testclientid",
      loginWith: {
        email: true,
      },
    },
  },
});
