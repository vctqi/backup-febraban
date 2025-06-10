const http = require('http');

const data = JSON.stringify({
  valorSolicitado: 50000,
  rendaMensal: 8000,
  tipoFinanciamento: 'investimento_fixo',
  prazoMeses: 60
});

const options = {
  hostname: 'localhost',
  port: 5099,
  path: '/api/financiamentos/simular',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Resultado da simulação:');
    const result = JSON.parse(responseData);
    console.log(JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('\nDetalhes do financiamento:');
      console.log(`- Valor solicitado: R$ ${result.data.valorSolicitado.toFixed(2)}`);
      console.log(`- Valor aprovado: R$ ${result.data.valorFinanciamento.toFixed(2)}`);
      console.log(`- Taxa de juros: ${result.data.taxaJuros.toFixed(2)}% ao ano`);
      console.log(`- Classificação de risco: ${result.data.classificacaoRisco}`);
      console.log(`- Prazo: ${result.data.prazoMeses} meses`);
      console.log(`- Valor da parcela: R$ ${result.data.parcela.toFixed(2)}`);
    }
  });
});

req.on('error', (error) => {
  console.error(`Erro na requisição: ${error.message}`);
});

req.write(data);
req.end();