let register = document.getElementById('register');

register.onclick = function(e) {
    e.preventDefault();
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const data = new FormData;
    data.append("login", login);
    data.append("password", password);
    console.log(data);
    fetch('signup', {
      method: "post",
      body: data,
    })
        .then(response => {
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        })

};

function toFormData(dataObject) {
  let formData = new FormData();
  for (let k in dataObject) {
    if (dataObject.hasOwnProperty(k)) {
      if (dataObject[k] && dataObject[k].files) {
        let file = dataObject[k].files[0];
        formData.append(k, file, file.name);
      } else if (Array.isArray(dataObject[k])) {
        formData.append(k, JSON.stringify(dataObject[k]));
      } else if (typeof dataObject[k] === 'object' && !(dataObject[k] instanceof File)) {
        formData.append(k, JSON.stringify(dataObject[k]));
      } else {
        formData.append(k, dataObject[k]);
      }
    }
  }
  return formData;
}

