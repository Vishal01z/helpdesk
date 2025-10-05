// src/utils/responses.js
exports.errorResponse = (code, field, message) => ({
  error: { code, field, message }
});
