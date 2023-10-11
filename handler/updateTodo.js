import { v4 } from "uuid";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { responses } from "../constants/responses.js";

const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export const updateTodo = async (event) => {
  if (!event.body || typeof event.body !== "string") {
    return responses.missingBody;
  }

  const body = JSON.parse(event.body);

  if (!body) {
    return responses.missingBody;
  }

  const pathParameters = event.pathParameters;

  if (!pathParameters || !pathParameters.id) {
    return responses.missingId;
  }

  const timestamp = new Date().getTime();

  const dynamoDbParams = {
    TableName: TODO_TABLE,
    Key: {
      id: pathParameters.id,
    },
    ExpressionAttributeValues: {
      ":todo": body.todo,
      ":checked": body.checked,
      ":updatedAt": timestamp,
    },
    UpdateExpression: `SET updatedAt = :updatedAt ${
      body.checked || body.checked === false ? ", checked = :checked" : ""
    } ${body.todo ? ", todo = :todo" : ""}`,
    ReturnValues: "ALL_NEW",
  };

  try {
    const { Item } = await dynamoDbClient.send(
      new UpdateCommand(dynamoDbParams)
    );
    return {
      statusCode: 200,
      body: JSON.stringify(Item),
    };
  } catch (error) {
    console.log("Error while updating todo:", error);
    return responses.errorUpdate;
  }
};
