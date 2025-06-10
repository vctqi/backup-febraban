// Formatar valor como moeda (R$)
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

// Formatar percentual
export const formatPercent = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
};

// Formatar número com separador de milhares
export const formatNumber = (value) => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

// Formatar data
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

// Remover formatação de moeda para obter apenas o número
export const unformatCurrency = (formattedValue) => {
  if (!formattedValue) return 0;
  
  // Remover símbolo da moeda, pontos e substituir vírgula por ponto
  const numericValue = formattedValue
    .replace(/[^\d,.-]/g, '')
    .replace(',', '.');
  
  return parseFloat(numericValue);
};