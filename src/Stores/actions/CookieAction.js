export function setCookie(data) {
  return {
    type: 'SET_COOKIE',
    payload: data,
  };
}
