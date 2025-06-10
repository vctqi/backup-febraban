from flask import Flask, render_template, request

app = Flask(__name__)

# Dados simplificados de quantidade de ração por peso e nível de atividade
racoes = [
    # Pequeno porte (até 10kg)
    {'peso_min': 1, 'peso_max': 5, 'porte': 'pequeno', 'atividade_baixa': '30-90g', 'atividade_media': '35-105g', 'atividade_alta': '40-120g'},
    {'peso_min': 5, 'peso_max': 10, 'porte': 'pequeno', 'atividade_baixa': '90-150g', 'atividade_media': '105-170g', 'atividade_alta': '120-190g'},
    
    # Médio porte (10kg a 25kg)
    {'peso_min': 10, 'peso_max': 15, 'porte': 'medio', 'atividade_baixa': '150-200g', 'atividade_media': '170-230g', 'atividade_alta': '190-260g'},
    {'peso_min': 15, 'peso_max': 20, 'porte': 'medio', 'atividade_baixa': '200-250g', 'atividade_media': '230-280g', 'atividade_alta': '260-310g'},
    {'peso_min': 20, 'peso_max': 25, 'porte': 'medio', 'atividade_baixa': '250-300g', 'atividade_media': '280-330g', 'atividade_alta': '310-360g'},
    
    # Grande porte (acima de 25kg)
    {'peso_min': 25, 'peso_max': 35, 'porte': 'grande', 'atividade_baixa': '300-370g', 'atividade_media': '330-410g', 'atividade_alta': '360-450g'},
    {'peso_min': 35, 'peso_max': 45, 'porte': 'grande', 'atividade_baixa': '370-450g', 'atividade_media': '410-500g', 'atividade_alta': '450-550g'},
    {'peso_min': 45, 'peso_max': 60, 'porte': 'grande', 'atividade_baixa': '450-550g', 'atividade_media': '500-600g', 'atividade_alta': '550-650g'},
    {'peso_min': 60, 'peso_max': 100, 'porte': 'grande', 'atividade_baixa': '550-650g+', 'atividade_media': '600-700g+', 'atividade_alta': '650-750g+'}
]

@app.route('/', methods=['GET', 'POST'])
def index():
    resultado = None
    
    if request.method == 'POST':
        try:
            peso = float(request.form['weight'])
            atividade = request.form['activity']
            
            # Determinar o porte automaticamente com base no peso
            if peso <= 10:
                porte = 'pequeno'
            elif peso <= 25:
                porte = 'medio'
            else:
                porte = 'grande'
                
            # Buscar a recomendação adequada
            for faixa in racoes:
                if faixa['peso_min'] <= peso <= faixa['peso_max']:
                    porcao = faixa[f'atividade_{atividade}']
                    
                    resultado = {
                        'peso': peso,
                        'porte': porte,
                        'atividade': atividade,
                        'porcao': porcao,
                        'faixa_peso': f"{faixa['peso_min']}-{faixa['peso_max']}kg"
                    }
                    break
            
            # Se não encontrou uma faixa específica
            if resultado is None:
                resultado = {
                    'peso': peso,
                    'porte': porte,
                    'atividade': atividade,
                    'porcao': 'Não encontrado para este peso',
                    'faixa_peso': 'Fora das faixas cadastradas'
                }
                
        except Exception as e:
            resultado = {
                'erro': f"Ocorreu um erro: {str(e)}"
            }
    
    return render_template('index.html', result=resultado)

if __name__ == '__main__':
    app.run(debug=True)