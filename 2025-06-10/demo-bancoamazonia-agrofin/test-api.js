const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5099,
  path: '/api/financiamentos/opcoes',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Dados recebidos:');
    console.log(JSON.parse(data));
  });
});

req.on('error', (error) => {
  console.error(`Erro na requisição: ${error.message}`);
});

req.end();