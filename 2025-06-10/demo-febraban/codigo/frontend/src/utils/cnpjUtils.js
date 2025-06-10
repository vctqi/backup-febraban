/**
 * Funções para validação e formatação de CNPJ
 */

/**
 * Remove caracteres não numéricos do CNPJ
 * @param {string} cnpj - CNPJ com ou sem formatação
 * @returns {string} CNPJ apenas com números
 */
export const sanitizeCnpj = (cnpj = '') => {
  return cnpj.replace(/[^\d]/g, '');
};

/**
 * Valida se o CNPJ possui formato válido
 * @param {string} cnpj - CNPJ a ser validado
 * @returns {boolean} true se o CNPJ for válido, false caso contrário
 */
export const validateCnpj = (cnpj) => {
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
export const formatCnpj = (cnpj) => {
  cnpj = sanitizeCnpj(cnpj);
  
  if (cnpj.length <= 2) {
    return cnpj;
  } else if (cnpj.length <= 5) {
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`;
  } else if (cnpj.length <= 8) {
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5)}`;
  } else if (cnpj.length <= 12) {
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8)}`;
  } else {
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
  }
};