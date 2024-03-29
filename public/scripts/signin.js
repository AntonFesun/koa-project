let signin = document.getElementById('signin-form');

signin.onsubmit = function (e) {
  e.preventDefault();
  const login = document.getElementById('login').value;
  const password = document.getElementById('password').value;
  const data = new FormData;
  data.append("login", login);
  data.append("password", password);
  return fetch('signin', {
    method: 'post',
    body: data
  })
    .then(response => {
      return response.json();
    })
    .then(obj => {
      console.log(obj);
      window.localStorage.setItem('token', obj.token);
    })
    .catch(error => {
      console.log(error);
    })
};
