export const createConfig = (token) => {
    var config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
    return config;
  }

export const persistToken = (token, expiryDate, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('expiryDate', expiryDate);
  localStorage.setItem('userId', user.id);
  localStorage.setItem('userEmail', user.email);
  localStorage.setItem('userIsAdmin', user.isAdmin);
}

export const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  return JSON.parse(jsonPayload);
};

export const createUserPayload = (token) => {
  var payload = parseJwt(token);
  var expiryDate = payload.exp;

  var user = {
    id: parseInt(payload.Id),
    email: payload.Email,
    isAdmin: payload.IsAdmin === 'True'
  };

  return { token, expiryDate, user };
}