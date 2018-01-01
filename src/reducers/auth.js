const defaultAuthState = {
  uid: localStorage.getItem('auth_token')
} || {}
export default (state = defaultAuthState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
