import decode from 'jwt-decode';

const tokenName = 'jwt';

const Auth = {
  getJWT: () => localStorage.getItem(tokenName),
  setJWT: (jwt) => localStorage.setItem(tokenName, jwt),
  deleteJWT: () => localStorage.removeItem(tokenName),
};

export default Auth;
