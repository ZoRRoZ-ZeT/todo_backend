const TYPES = {
  TodoRepository: Symbol.for('TodoRepository'),
  UserRepository: Symbol.for('UserRepository'),
  TokenRepository: Symbol.for('TokenRepository'),
  TodoService: Symbol.for('TodoService'),
  TokenService: Symbol.for('TokenService'),
  MailService: Symbol.for('MailService'),
  UserService: Symbol.for('UserService'),
  TodoController: Symbol.for('TodoController'),
  UserController: Symbol.for('UserController'),
  TodoRouter: Symbol.for('TodoRouter'),
  UserRouter: Symbol.for('UserRouter'),
  RootRouter: Symbol.for('RootRouter'),
  Application: Symbol.for('Application'),
};

export default TYPES;
