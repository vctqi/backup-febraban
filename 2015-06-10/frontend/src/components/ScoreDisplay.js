import React from 'react';
import { Badge } from 'react-bootstrap';

const ScoreDisplay = ({ score, classificacao, nivelRisco }) => {
  const getNivelRiscoClass = (nivel) => {
    switch (nivel.toLowerCase()) {
      case 'muito baixo': return 'muito-baixo';
      case 'baixo': return 'baixo';
      case 'médio-baixo': return 'medio-baixo';
      case 'médio': return 'medio';
      case 'médio-alto': return 'medio-alto';
      case 'alto': return 'alto';
      case 'muito alto': return 'muito-alto';
      default: return 'medio';
    }
  };

  const riscoClass = getNivelRiscoClass(nivelRisco);
  
  return (
    <div className="text-center">
      <div className={`score-display ${riscoClass}`}>
        {score}
      </div>
      <div className="mt-3">
        <Badge className={`classificacao-badge classificacao-${classificacao}`}>
          {classificacao}
        </Badge>
      </div>
      <div className="mt-2 text-muted">
        Nível de Risco: <strong>{nivelRisco}</strong>
      </div>
    </div>
  );
};

export default ScoreDisplay;