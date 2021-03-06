const constants = {
  NOT_AUTHORIZED: 401,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  UNSUPPORTED_MEDIA: 415,
  PAYLOAD_TOO_LARGE: 413,

  BAD_GATEWAY: 502,
  NOT_IMPLEMENTED: 501,
  INTERNAL_ERROR: 500,

  CREATED: 201,
  DELETED: 204,
  NO_CONTENT: 204,
  OK: 200,
};

export default constants;

export const NOTIFY_TYPES = {
  COMMENTED: 'COMMENTED',
  MENTIONED: 'MENTIONED',
};
