/**
 * Função para validar CNPJ
 * @param {string} cnpj - CNPJ a ser validado (com ou sem formatação)
 * @returns {boolean} - Retorna true se o CNPJ for válido
 */
function validarCNPJ(cnpj) {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]/g, '');
  
  // Verifica se tem 14 dígitos
  if (cnpj.length !== 14) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais (caso inválido)
  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }
  
  // Algoritmo de validação do CNPJ
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  
  // Cálculo do primeiro dígito verificador
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(0))) {
    return false;
  }
  
  // Cálculo do segundo dígito verificador
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(1))) {
    return false;
  }
  
  return true;
}

/**
 * Função para formatar CNPJ
 * @param {string} cnpj - CNPJ sem formatação
 * @returns {string} - CNPJ formatado (XX.XXX.XXX/XXXX-XX)
 */
function formatarCNPJ(cnpj) {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]/g, '');
  
  // Aplica a formatação
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

/**
 * Função para remover formatação do CNPJ
 * @param {string} cnpj - CNPJ com ou sem formatação
 * @returns {string} - CNPJ sem formatação (apenas números)
 */
function removerFormatacaoCNPJ(cnpj) {
  return cnpj.replace(/[^\d]/g, '');
}

module.exports = {
  validarCNPJ,
  formatarCNPJ,
  removerFormatacaoCNPJ
};