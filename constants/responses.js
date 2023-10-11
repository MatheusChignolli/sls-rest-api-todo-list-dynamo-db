export const responses = {
  missingTodo: {
    statusCode: 400,
    body: JSON.stringify({
      message: "Missing todo",
    }),
  },
  missingBody: {
    statusCode: 400,
    body: JSON.stringify({
      message: "Missing body",
    }),
  },
  errorUpdate: {
    statusCode: 500,
    body: JSON.stringify({
      message: "Error while updating todo",
    }),
  },
  missingId: {
    statusCode: 400,
    body: JSON.stringify({
      message: "Missing id",
    }),
  },
  missingPathParameters: {
    statusCode: 400,
    body: JSON.stringify({
      message: "Missing path parameters",
    }),
  },
  notFound: {
    statusCode: 404,
    body: JSON.stringify({
      message: "Todo not found",
    }),
  },
  errorList: {
    statusCode: 500,
    body: JSON.stringify({
      message: "Error while listing todos",
    }),
  },
  errorCreate: {
    statusCode: 500,
    body: JSON.stringify({
      message: "Error while creating todo",
    }),
  },
  errorDelete: {
    statusCode: 500,
    body: JSON.stringify({
      message: "Error while deleting todo",
    }),
  },
  created: {
    statusCode: 200,
    body: JSON.stringify({
      message: "Todo created",
    }),
  },
  deleted: {
    statusCode: 200,
    body: JSON.stringify({
      message: "Todo deleted",
    }),
  },
};
