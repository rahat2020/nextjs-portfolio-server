/**
 * Standard API response helper.
 * Ensures every response follows the same shape:
 * { success, message, data, meta? }
 */
const sendResponse = (res, { statusCode = 200, message = "Success", data = null, meta = null }) => {
  const response = {
    success: true,
    message,
    data,
  };

  if (meta) response.meta = meta;

  return res.status(statusCode).json(response);
};

export default sendResponse;
