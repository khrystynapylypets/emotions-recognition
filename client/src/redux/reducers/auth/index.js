import types from '../../actions/auth/types';

const initialState = {
  isSigningUp: false,
  isSigningIn: false,
};

export const authReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP:
      return {
        ...prevState,
        isSigningUp: true,
      };
    case types.SIGN_UP_SUCCESS:
      return {
        ...prevState,
        isSigningUp: false,
      };
    case types.SIGN_UP_FAIL:
      return {
        ...prevState,
        isSigningUp: false,
      };
    case types.SIGN_IN:
      return {
        ...prevState,
        isSigningIn: true,
      };
    case types.SIGN_IN_SUCCESS: {
      return {
        ...prevState,
        isSigningIn: false,
      };
    }
    case types.SIGN_IN_FAIL:
      return {
        ...prevState,
        isSigningIn: false,
      };
    default:
      return prevState;
  }
};
