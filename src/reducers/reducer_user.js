import { SIGNED_IN } from '../constants';

let user = {
  email: null,
  userID: null,
  logToken: null
}

export default (state = user, action) => {
  switch (action.type) {
    case SIGNED_IN:
      const { email, userID, logToken } = action;
      user = {
        email,
        userID,
        logToken
      }
      return user;
    default:
      return state;
  }
}
