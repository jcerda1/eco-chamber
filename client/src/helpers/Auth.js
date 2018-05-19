import decode from 'jwt-decode';

const Auth = {
  getJWT: () => localStorage.getItem('jwt'),
  setJWT: (jwt) => localStorage.setItem('jwt', jwt),
};

export default Auth;
