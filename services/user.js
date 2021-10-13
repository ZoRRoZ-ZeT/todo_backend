/* eslint-disable import/extensions */
import '../config.js';
import { decorate, inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import UserDto from '../dto/user.js';
import { validateRefreshToken } from '../utils/validations.js';
import AuthorizationError from '../exceptions/auth.js';
import TYPES from '../constants/types.js';

class UserService {
  constructor(userRepository, tokenService, mailService) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
    this.mailService = mailService;
  }

  async getUserById(id) {
    const user = await this.userRepository.getUserById(id);
    return user;
  }

  async register(email, password) {
    const candidate = await this.userRepository.getUserByEmail(email);
    if (candidate) {
      throw new Error(`User with email: '${email}' already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = v4();

    const user = await this.userRepository.addUser(email, hashPassword, activationLink);
    await this.mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens };
  }

  async activate(activationLink) {
    const user = await this.userRepository.getUserByLink(activationLink);
    if (!user) {
      throw new Error('Wrong activation link!');
    }
    const userDto = new UserDto(user);
    userDto.isActivated = true;
    await this.userRepository.updateUser(userDto);
  }

  async login(email, password) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error(`User with email: '${email}' doesn't exists`);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new Error('Password incorrect');
    }

    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens };
  }

  async logout(refreshToken) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new AuthorizationError([{
        message: 'You are not authorized!',
      }]);
    }
    const userData = validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new AuthorizationError([{
        message: 'Token is invalid!',
      }]);
    }

    const user = await this.userRepository.getUserById(userData.id);
    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens };
  }
}

decorate(injectable(), UserService);
decorate(inject(TYPES.UserRepository), UserService, 0);
decorate(inject(TYPES.TokenService), UserService, 1);
decorate(inject(TYPES.MailService), UserService, 2);

export default UserService;
