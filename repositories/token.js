/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import { decorate, injectable } from 'inversify';
import db from '../db.js';

class TokenRepository {
  extractToken(token) {
    if (token.rows.length === 0) {
      return null;
    }
    return token.rows[0];
  }

  async getTokenById(userId) {
    const token = await db.query('SELECT * FROM token WHERE user_id = $1', [userId]);
    return this.extractToken(token);
  }

  async getTokenByValue(refreshToken) {
    const token = await db.query('SELECT * FROM token WHERE refreshtoken = $1', [refreshToken]);
    return this.extractToken(token);
  }

  async updateToken(userId, token) {
    const updatedToken = await db.query('UPDATE token SET refreshtoken = $1 WHERE user_id = $2 RETURNING *', [token, userId]);
    return this.extractToken(updatedToken);
  }

  async addToken(userId, token) {
    const createdToken = await db.query('INSERT INTO token VALUES ($1, $2) RETURNING *', [userId, token]);
    return this.extractToken(createdToken);
  }

  async deleteToken(refreshToken) {
    const deletedToken = await db.query('DELETE FROM token WHERE refreshtoken = $1', [refreshToken]);
    return this.extractToken(deletedToken);
  }
}

decorate(injectable(), TokenRepository);

export default TokenRepository;
