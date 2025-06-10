/**
 * Funções para validação e formatação de CNPJ
 */

/**
 * Remove caracteres não numéricos do CNPJ
 * @param {string} cnpj - CNPJ com ou sem formatação
 * @returns {string} CNPJ apenas com números
 */
const sanitizeCnpj = (cnpj) => {
  return cnpj.replace(/[^\d]/g, '');
};

/**
 * Valida se o CNPJ possui formato válido
 * @param {string} cnpj - CNPJ a ser validado
 * @returns {boolean} true se o CNPJ for válido, false caso contrário
 */
const validateCnpj = (cnpj) => {
  // Remove caracteres não numéricos
  cnpj = sanitizeCnpj(cnpj);
  
  // Verifica se possui 14 dígitos
  if (cnpj.length !== 14) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }
  
  // Cálculo do primeiro dígito verificador
  let soma = 0;
  let peso = 5;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }
  let resto = soma % 11;
  let dv1 = resto < 2 ? 0 : 11 - resto;
  
  // Cálculo do segundo dígito verificador
  soma = 0;
  peso = 6;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }
  soma += dv1 * 2;
  resto = soma % 11;
  let dv2 = resto < 2 ? 0 : 11 - resto;
  
  // Verifica se os dígitos verificadores estão corretos
  return parseInt(cnpj.charAt(12)) === dv1 && parseInt(cnpj.charAt(13)) === dv2;
};

/**
 * Formata o CNPJ para exibição (XX.XXX.XXX/XXXX-XX)
 * @param {string} cnpj - CNPJ apenas com números
 * @returns {string} CNPJ formatado
 */
const formatCnpj = (cnpj) => {
  cnpj = sanitizeCnpj(cnpj);
  
  if (cnpj.length !== 14) {
    return cnpj;
  }
  
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
};

module.exports = {
  sanitizeCnpj,
  validateCnpj,
  formatCnpj
};