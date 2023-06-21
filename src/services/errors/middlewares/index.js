import EErrors from "../errors-enum.js";

export default (error, request, response, next) => {
  console.error(error.cause);

  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
      response.status(400).send({ status: "Error", error: error.message });
      break;

    default:
      response.send({ status: "Error", error: "Unhandled error!" });
  }
};
