/* eslint-disable import/extensions */
import '../config.js';
import { decorate, inject, injectable } from 'inversify';

import TYPES from '../constants/types.js';

class UserController {
  constructor(userService) {
    this.userService = userService;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.activate = this.activate.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const tokens = await this.userService.register(email, password);
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.status(200).json({
        statusCode: 200,
        payload: tokens.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const tokens = await this.userService.login(email, password);
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.status(200).json({
        statusCode: 200,
        payload: tokens.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await this.userService.logout(refreshToken);
      res.clearCookie('refreshToken');

      res.status(200).json({
        statusCode: 200,
        payload: token,
      });
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await this.userService.activate(activationLink);
      res.status(300).redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const tokens = await this.userService.refresh(refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.status(200).json({
        statusCode: 200,
        payload: tokens.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

decorate(injectable(), UserController);
decorate(inject(TYPES.UserService), UserController, 0);

export default UserController;
