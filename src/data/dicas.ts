import { DicaEconomiaAgua } from '../types';
import dicasData from '../../dicas_economia_agua.json';

export const dicas: DicaEconomiaAgua[] = dicasData;

// Função para obter dicas personalizadas baseadas no desempenho
export const obterDicasPersonalizadas = (percentualAcerto: number): DicaEconomiaAgua[] => {
  let dicasSelecionadas: DicaEconomiaAgua[] = [];

  if (percentualAcerto >= 80) {
    // Excelente desempenho - dicas avançadas
    dicasSelecionadas = dicas.filter(dica => 
      dica.categoria === 'Equipamentos' || dica.categoria === 'Jardinagem'
    ).slice(0, 3);
  } else if (percentualAcerto >= 60) {
    // Bom desempenho - dicas intermediárias
    dicasSelecionadas = dicas.filter(dica => 
      dica.categoria === 'Cozinha' || dica.categoria === 'Banheiro'
    ).slice(0, 4);
  } else {
    // Precisa melhorar - dicas básicas
    dicasSelecionadas = dicas.filter(dica => 
      dica.categoria === 'Banho' || dica.categoria === 'Higiene Pessoal'
    ).slice(0, 5);
  }

  return dicasSelecionadas;
};

// Função para obter dicas por categoria
export const obterDicasPorCategoria = (categoria: string): DicaEconomiaAgua[] => {
  return dicas.filter(dica => dica.categoria === categoria);
};

// Função para obter todas as categorias
export const obterCategoriasDicas = (): string[] => {
  const categorias = [...new Set(dicas.map(dica => dica.categoria))];
  return categorias.sort();
};

