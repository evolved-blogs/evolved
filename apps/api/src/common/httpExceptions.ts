export enum HTTPErrorMessages {
  BAD_REQUEST = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not Found',
  METHOD_NOT_ALLOWED = 'Method Not Allowed',
  CONFLICT = 'Conflict',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
}

export const HTTPExceptions = {
  BAD_REQUEST: { code: 400, message: HTTPErrorMessages.BAD_REQUEST },
  UNAUTHORIZED: { code: 401, message: HTTPErrorMessages.UNAUTHORIZED },
  FORBIDDEN: { code: 403, message: HTTPErrorMessages.FORBIDDEN },
  NOT_FOUND: { code: 404, message: HTTPErrorMessages.NOT_FOUND },
  METHOD_NOT_ALLOWED: {
    code: 405,
    message: HTTPErrorMessages.METHOD_NOT_ALLOWED,
  },
  CONFLICT: { code: 409, message: HTTPErrorMessages.CONFLICT },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: HTTPErrorMessages.INTERNAL_SERVER_ERROR,
  },
};
