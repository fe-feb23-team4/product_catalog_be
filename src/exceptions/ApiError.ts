interface ApiErrorI {
  status: number;
  message: string;
  errors: object;
}

export class ApiError extends Error implements ApiErrorI {
  status: number;
  message: string;
  errors: object;

  constructor(statusCode: number, message: string, errors = {}) {
    super(message);

    this.status = statusCode;
    this.errors = errors;
  }

  static BadRequest(message: string, errors = {}) {
    return new ApiError(400, message, errors);
  }

  static Unauthorized() {
    return new ApiError(401, 'User is not authorized');
  }

  static NotFound() {
    return new ApiError(404, 'Not found');
  }
}
