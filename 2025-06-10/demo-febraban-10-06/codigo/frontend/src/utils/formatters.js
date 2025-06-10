/**
 * Formata um CNPJ para exibição (XX.XXX.XXX/XXXX-XX)
 * @param {string} cnpj - CNPJ sem formatação
 * @returns {string} - CNPJ formatado
 */
export const formatarCNPJ = (cnpj) => {
  if (!cnpj) return '';
  
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]/g, '');
  
  // Aplica a formatação
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
};

/**
 * Formata uma data para exibição (DD/MM/YYYY)
 * @param {string} date - Data em formato ISO
 * @returns {string} - Data formatada
 */
export const formatarData = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('pt-BR');
};

/**
 * Calcula o tempo de operação de uma empresa em anos e meses
 * @param {string} dataAbertura - Data de abertura em formato ISO
 * @returns {string} - Tempo de operação formatado
 */
export const calcularTempoOperacao = (dataAbertura) => {
  if (!dataAbertura) return 'Não disponível';
  
  const inicio = new Date(dataAbertura);
  const hoje = new Date();
  
  const diferencaMeses = (hoje.getFullYear() - inicio.getFullYear()) * 12 + 
                         (hoje.getMonth() - inicio.getMonth());
  
  const anos = Math.floor(diferencaMeses / 12);
  const meses = diferencaMeses % 12;
  
  if (anos > 0 && meses > 0) {
    return `${anos} ano${anos > 1 ? 's' : ''} e ${meses} mês${meses > 1 ? 'es' : ''}`;
  } else if (anos > 0) {
    return `${anos} ano${anos > 1 ? 's' : ''}`;
  } else {
    return `${meses} mês${meses > 1 ? 'es' : ''}`;
  }
};