import React from "react";

const ErrorsMessage = (message) => {
  return <div style={{ color: "red" }}>{message.message.message}</div>;
};

export default ErrorsMessage;
