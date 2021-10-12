/* eslint-disable import/extensions */
import AuthorizationError from '../exceptions/auth.js';
import { validateAccessToken } from '../utils/validations.js';

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new AuthorizationError('Вы не авторизованы!');
    }

    const accessToken = authorization.split(' ')[1];
    if (!accessToken) {
      throw new AuthorizationError('Вы не авторизованы!');
    }

    const userData = validateAccessToken(accessToken);
    if (!userData) {
      throw new AuthorizationError('Ваш токен не валиден!');
    }

    if (!userData.isActivated) {
      throw new AuthorizationError('Ваша почта не подтверждена!');
    }

    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
