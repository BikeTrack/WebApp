import { SIGNED_IN } from '../constants';

export function logUser(email, userID, logToken) {
  const action = {
    type: SIGNED_IN,
    email,
    userID,
    logToken
  }
  return action;
}
