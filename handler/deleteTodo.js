import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { responses } from "../constants/responses.js";

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

export const deleteTodo = async (event) => {
  const pathParameters = event.pathParameters;

  if (!pathParameters || !pathParameters.id) {
    return responses.missingPathParameters;
  }

  const id = pathParameters.id;

  const dynamoDbParams = {
    TableName: TODO_TABLE,
    Key: {
      id,
    },
  };

  try {
    await dynamoDbClient.send(new DeleteCommand(dynamoDbParams));

    return responses.deleted;
  } catch (error) {
    console.log("Error while deleting todo:", error);
    return responses.errorDelete;
  }
};
