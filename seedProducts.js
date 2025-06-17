const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/products/seed',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('RESPONSE:', data);
    console.log('Productos cargados correctamente');
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.end();

console.log('Solicitando carga de productos...'); 