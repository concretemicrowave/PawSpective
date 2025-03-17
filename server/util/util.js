function success(payload) {
  return {
    status: "OK",
    success: true,
    data: payload,
  };
}

function error(message) {
  return {
    status: "ERROR",
    success: false,
    message,
  };
}

const util = {
  success,
  error,
};

module.exports = util;
