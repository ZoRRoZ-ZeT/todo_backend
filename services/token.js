/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import '../config.js';
import { decorate, inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';

import TYPES from '../constants/types.js';

class TokenService {
  constructor(tokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '10s' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await this.tokenRepository.getTokenById(userId);
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      const token = await this.tokenRepository.updateToken(userId, tokenData.refreshToken);
      return token;
    }
    const token = await this.tokenRepository.addToken(userId, refreshToken);
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await this.tokenRepository.deleteToken(refreshToken);
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await this.tokenRepository.getTokenByValue(refreshToken);
    return tokenData;
  }
}

decorate(injectable(), TokenService);
decorate(inject(TYPES.TokenRepository), TokenService, 0);

export default TokenService;
