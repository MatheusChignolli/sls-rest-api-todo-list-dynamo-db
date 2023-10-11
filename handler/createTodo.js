import { v4 } from "uuid";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { responses } from "../constants/responses.js";

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

export const createTodo = async (event) => {
  if (!event.body || typeof event.body !== "string") {
    return responses.missingBody;
  }

  const body = JSON.parse(event.body);

  if (!body) {
    return responses.body;
  }

  if (!body.todo) {
    return responses.missingTodo;
  }

  const timestamp = new Date().getTime();
  const id = v4();

  const dynamoDbParams = {
    TableName: TODO_TABLE,
    Item: {
      id,
      todo: body.todo,
      checked: false,
      createAt: timestamp,
      updatedAt: timestamp,
    },
  };

  try {
    await dynamoDbClient.send(new PutCommand(dynamoDbParams));
    return responses.created;
  } catch (error) {
    console.log("Error while creating todo:", error);
    return responses.errorCreate;
  }
};
