import AWS from "aws-sdk";

export default function useAWS() {
  // Initialize the Amazon Cognito credentials provider
  AWS.config.region = "us-east-2"; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:c418fb81-39d1-4bae-bbd6-21cb573d5f43",
  });
  const docClient = new AWS.DynamoDB.DocumentClient();
  return { docClient };
}
