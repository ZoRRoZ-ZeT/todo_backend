/* eslint-disable import/extensions */
import AuthorizationError from '../exceptions/auth.js';
import { validateAccessToken } from '../utils/validations.js';

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new AuthorizationError([{
        message: 'You are not authorized!',
      }]);
    }

    const accessToken = authorization.split(' ')[1];
    if (!accessToken) {
      throw new AuthorizationError([{
        message: 'You are not authorized!',
      }]);
    }

    const userData = validateAccessToken(accessToken);
    if (!userData) {
      throw new AuthorizationError([{
        message: 'Token are invalid!',
      }]);
    }

    if (!userData.isActivated) {
      throw new AuthorizationError([{
        message: 'Account is not activated!',
      }]);
    }

    req.userId = userData.id;
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
