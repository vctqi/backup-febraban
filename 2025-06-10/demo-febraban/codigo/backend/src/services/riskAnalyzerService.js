/**
 * Serviço para análise de risco com base nos dados do CNPJ
 */
class RiskAnalyzerService {
  /**
   * Critérios para pontuação de risco
   */
  constructor() {
    // Lista de CNAEs considerados de risco
    this.cnaesDeRisco = [
      '6499', // Factoring
      '4511', // Comércio de veículos
      '4120', // Construção de edifícios
      '6810', // Atividades imobiliárias
      '9200', // Atividades de jogos de azar
      '4511', // Comércio de veículos
      '4512', // Comércio de outros veículos
    ];
  }

  /**
   * Calcula o score de risco com base nos dados da empresa
   * @param {Object} dadosEmpresa - Dados da empresa consultada
   * @returns {Object} Resultado da análise com score, classificação e critérios
   */
  analisarRisco(dadosEmpresa) {
    const criterios = [];
    let score = 0;
    const sinaisAlerta = [];

    // Critério 1: Situação cadastral
    if (this.situacaoAtiva(dadosEmpresa.situacao_cadastral)) {
      score += 10;
      criterios.push({
        descricao: 'Empresa com situação cadastral ativa',
        impacto: 10
      });
    } else {
      score -= 20;
      criterios.push({
        descricao: 'Empresa com situação cadastral irregular',
        impacto: -20
      });
      sinaisAlerta.push('Situação cadastral irregular');
    }

    // Critério 2: Tempo de operação
    const tempoOperacao = this.calcularTempoOperacao(dadosEmpresa.data_abertura);
    
    if (tempoOperacao >= 3) {
      score += 10;
      criterios.push({
        descricao: 'Empresa com mais de 3 anos de operação',
        impacto: 10
      });
    } else if (tempoOperacao < 0.5) {
      score -= 10;
      criterios.push({
        descricao: 'Empresa aberta há menos de 6 meses',
        impacto: -10
      });
      sinaisAlerta.push('Empresa recém-aberta (menos de 6 meses)');
    }

    // Critério 3: Análise do CNAE
    const cnaeInicio = dadosEmpresa.cnae_codigo ? dadosEmpresa.cnae_codigo.substring(0, 4) : '';
    
    if (this.cnaesDeRisco.includes(cnaeInicio)) {
      score -= 10;
      criterios.push({
        descricao: 'CNAE considerado de risco',
        impacto: -10
      });
      sinaisAlerta.push('CNAE com risco associado');
    } else {
      score += 10;
      criterios.push({
        descricao: 'CNAE de baixo risco',
        impacto: 10
      });
    }

    // Classificação do risco com base no score final
    let classificacao;
    let cor;
    
    if (score >= 20) {
      classificacao = 'Baixo';
      cor = 'verde';
    } else if (score >= 0) {
      classificacao = 'Médio';
      cor = 'amarelo';
    } else {
      classificacao = 'Alto';
      cor = 'vermelho';
    }

    return {
      score_final: score,
      classificacao_risco: classificacao,
      cor_risco: cor,
      criterios_aplicados: criterios,
      sinais_alerta: sinaisAlerta
    };
  }

  /**
   * Verifica se a situação cadastral é ativa
   * @param {string} situacao - Situação cadastral da empresa
   * @returns {boolean} true se ativa, false caso contrário
   * @private
   */
  situacaoAtiva(situacao) {
    return situacao && situacao.toUpperCase() === 'ATIVA';
  }

  /**
   * Calcula o tempo de operação da empresa em anos
   * @param {string} dataAbertura - Data de abertura da empresa (YYYY-MM-DD)
   * @returns {number} Tempo de operação em anos
   * @private
   */
  calcularTempoOperacao(dataAbertura) {
    if (!dataAbertura) return 0;
    
    const hoje = new Date();
    const abertura = new Date(dataAbertura);
    
    // Se data inválida, retorna 0
    if (isNaN(abertura.getTime())) return 0;
    
    const diferencaMs = hoje - abertura;
    const anos = diferencaMs / (1000 * 60 * 60 * 24 * 365.25);
    
    return parseFloat(anos.toFixed(1));
  }
}

module.exports = new RiskAnalyzerService();