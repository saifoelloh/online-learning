interface HttpResponseInterface {
  statusCode: number;
  name: string;
  message: string;
}
interface HttpCodeInterface {
  [key: number]: HttpResponseInterface;
}

const HttpCode: HttpCodeInterface = {
  200: {
    statusCode: 200,
    name: "success",
    message: "success",
  },
  201: {
    statusCode: 201,
    name: "created",
    message: "created",
  },
  400: {
    statusCode: 400,
    name: "bad request",
    message: "bad request",
  },
  401: {
    statusCode: 401,
    name: "unauthorize",
    message: "unauthorize",
  },
  402: {
    statusCode: 402,
    name: "payment required",
    message: "payment required",
  },
  403: {
    statusCode: 403,
    name: "forbidden",
    message: "forbidden",
  },
  404: {
    statusCode: 404,
    name: "not found",
    message: "not found",
  },
  409: {
    statusCode: 409,
    name: "conflict",
    message: "conflict",
  },
  500: {
    statusCode: 500,
    name: "internal server error",
    message: "internal server error",
  },
};

export default HttpCode;
