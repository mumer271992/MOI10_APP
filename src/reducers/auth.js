const defaultAuthState = {
  uid: localStorage.getItem('auth_token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
} || {}
export default (state = defaultAuthState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
        user: action.user
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
