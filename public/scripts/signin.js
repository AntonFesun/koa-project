let signin = document.getElementById('signin');

signin.onclick = function (e) {
  e.preventDefault();
  const login = document.getElementById('login').value;
  const password = document.getElementById('password').value;
  const data = new FormData;
  data.append("login", login);
  data.append("password", password);
  console.log(data);
  fetch('signin', {
    method: 'post',
    body: data
  })
    .then(response => {
      console.log(response);
      window.localStorage.setItem('token', response.token);
    })
    .catch(e => {
      console.log(e);
    })
};