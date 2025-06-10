#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Calculadora de Ração para Cães

Este programa calcula a quantidade diária de ração recomendada para cães
com base no peso e nível de atividade física.
"""

import sys

# Dados de quantidade de ração por peso e nível de atividade
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

def main():
    print("\n=== CALCULADORA DE RAÇÃO PARA CÃES ===\n")
    
    try:
        # Obter o peso do cão
        peso_input = input("Digite o peso do cão em kg (ex: 8.5): ")
        peso = float(peso_input.replace(',', '.'))
        
        if peso <= 0:
            print("Erro: O peso deve ser um número positivo.")
            return
        
        # Obter o nível de atividade
        print("\nNível de atividade física:")
        print("1 - Baixa (cães idosos ou sedentários)")
        print("2 - Média (passeios regulares)")
        print("3 - Alta (cães muito ativos ou atletas)")
        
        opcao = input("\nEscolha uma opção (1-3): ")
        
        if opcao == '1':
            atividade = 'baixa'
        elif opcao == '2':
            atividade = 'media'
        elif opcao == '3':
            atividade = 'alta'
        else:
            print("Erro: Opção inválida.")
            return
        
        # Determinar o porte do cão
        if peso <= 10:
            porte = 'pequeno'
            descricao_porte = 'Pequeno'
        elif peso <= 25:
            porte = 'medio'
            descricao_porte = 'Médio'
        else:
            porte = 'grande'
            descricao_porte = 'Grande'
        
        # Buscar a recomendação
        encontrou = False
        
        for faixa in racoes:
            if faixa['peso_min'] <= peso <= faixa['peso_max']:
                porcao = faixa[f'atividade_{atividade}']
                faixa_peso = f"{faixa['peso_min']}-{faixa['peso_max']}kg"
                encontrou = True
                break
        
        # Exibir resultado
        print("\n" + "=" * 40)
        print(f"RESULTADO PARA UM CÃO DE {peso}kg")
        print("=" * 40)
        
        if encontrou:
            print(f"Porte: {descricao_porte} (faixa de peso: {faixa_peso})")
            print(f"Nível de atividade: {atividade.capitalize()}")
            print(f"Quantidade recomendada: {porcao} de ração por dia")
        else:
            print(f"Não foi encontrada uma recomendação específica para o peso de {peso}kg.")
            print("Por favor, consulte um veterinário.")
        
        print("\nObservações importantes:")
        print("- Esta é apenas uma recomendação geral. Consulte o veterinário para")
        print("  recomendações específicas.")
        print("- Ajuste a quantidade de acordo com a ração específica (verifique a embalagem).")
        print("- Para filhotes e fêmeas gestantes ou lactantes, consulte um veterinário.")
        print("- Divida a quantidade diária em 2-3 porções ao longo do dia.")
        
    except ValueError:
        print("Erro: Por favor, digite um número válido para o peso.")
    except Exception as e:
        print(f"Erro inesperado: {str(e)}")

if __name__ == "__main__":
    main()
    input("\nPressione ENTER para sair...")