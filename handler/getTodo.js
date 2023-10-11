import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { responses } from "../constants/responses.js";

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

export const getTodo = async (event) => {
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
    const { Item } = await dynamoDbClient.send(new GetCommand(dynamoDbParams));

    if (!Item) {
      return responses.notFound;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(Item),
    };
  } catch (error) {
    console.log("Error while getting todo:", error);
    return responses.errorCreate;
  }
};
