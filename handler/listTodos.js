import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { responses } from "../constants/responses.js";

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

export const listTodos = async () => {
  const dynamoDbParams = {
    TableName: TODO_TABLE,
  };

  try {
    const { Items } = await dynamoDbClient.send(
      new ScanCommand(dynamoDbParams)
    );

    return {
      statusCode: 200,
      body: JSON.stringify(Items),
    };
  } catch (error) {
    console.log("Error while listing todos:", error);
    return responses.errorList;
  }
};
