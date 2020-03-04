function login(email, password) {
  return apolloClient
    .query({ query: LOGIN, variables: { email, password } })
    .then(data => {
      const token = data.data.backofficeLogin.token;
      localStorage.setItem(LOGIN_TOKEN, token);
      return token;
    });
}

function logout() {
  localStorage.removeItem(LOGIN_TOKEN);
}

export const userService = { login, logout };
