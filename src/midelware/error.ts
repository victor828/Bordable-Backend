export class ApiError extends Error {
  // status: number;
  details?: Record<string, any>;

  constructor(message: string, status: number, details?: Record<string, any>) {
    super(message);
    // this.status = status;
    // this.details = details;
  }
  toJSON() {
    return {
      error: {
        message: "┗|｀O′|┛ |┬┴┬┴┤(･_├┬┴┬┴|  " + this.message,
        // status: this.status,
        // details: this.details,
      },
    };
  }
}
