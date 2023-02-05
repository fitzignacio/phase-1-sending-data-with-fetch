const nock = require('nock');

function submitData(name, email) {
  const data = { name, email };

  nock('http://localhost:3000')
    .post('/users', data)
    .reply(201, { id: 123 });

  return fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(json => {
      const id = json.id;
      document.body.innerHTML += `<p>New User ID: ${id}</p>`;
    })
    .catch(error => {
      document.body.innerHTML += `<p>Error: ${error.message}</p>`;
    });
}
