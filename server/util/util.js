function success(payload) {
  return {
    status: "OK",
    data: payload,
  };
}

function error(message, code = 0x1) {
  return {
    status: "ERROR",
    code,
    message,
  };
}

const util = {
  success,
  error,
};

module.exports = util;
