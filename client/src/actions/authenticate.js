export const LOGIN_SUCCESS = 'LOGIN__SUCESSS';
export const LOGOUT_SUCCESS = 'LOGOUT__SUCESS';

export function onLogin(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload,
  }      
}

export function onLogout() {
  return {
    type: LOGOUT_SUCCESS,
  }
}