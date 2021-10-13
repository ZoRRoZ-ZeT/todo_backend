/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import { decorate, injectable } from 'inversify';
import db from '../db.js';

class UserRepository {
  extractUser(user) {
    if (user.rows.length === 0) {
      return null;
    }
    return user.rows[0];
  }

  async getUserByEmail(email) {
    const user = await db.query('SELECT * FROM person WHERE email = $1', [email]);
    return this.extractUser(user);
  }

  async getUserByLink(activationLink) {
    const user = await db.query('SELECT * FROM person WHERE activationlink = $1', [activationLink]);
    return this.extractUser(user);
  }

  async getUserById(userId) {
    const user = await db.query('SELECT * FROM person WHERE id = $1', [userId]);
    return this.extractUser(user);
  }

  async updateUser(user) {
    const updatedUser = await db.query('UPDATE person SET isactivated = $1 WHERE email = $2 RETURNING *', [user.isActivated, user.email]);
    return this.extractUser(updatedUser);
  }

  async addUser(email, password, link) {
    const createdUser = await db.query('INSERT INTO person(email,password,activationlink) VALUES ($1, $2, $3) RETURNING *', [email, password, link]);
    return this.extractUser(createdUser);
  }
}

decorate(injectable(), UserRepository);

export default UserRepository;
