class AuthorizationError extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
  }
}

export default AuthorizationError;
