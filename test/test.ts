const options = {
  apiVersion: 'v1', // default
  endpoint: 'http://10.100.64.175:8201', // default
  token: '00000000-0000-0000-0000-000000000000' // optional client token; can be fetched after valid initialization of the server
};

var vault = require("node-vault")(options);

// init vault server
vault.init({ secret_shares: 1, secret_threshold: 1 })
.then( (result) => {
  var keys = result.keys;
  // set token for all following requests
  vault.token = result.root_token;
  // unseal vault server
  return vault.unseal({ secret_shares: 1, key: keys[0] })
})
.catch(console.error);

vault.reade('/secret/hell', )