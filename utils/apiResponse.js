class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  static success(data, message = "Success") {
    return new ApiResponse(200, data, message);
  }

  static created(data, message = "Resource created") {
    return new ApiResponse(201, data, message);
  }

  static error(statusCode, message = "Something went wrong", errors = []) {
    return new ApiResponse(statusCode, null, message);
  }
}

module.exports = ApiResponse;
