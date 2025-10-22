import { Pergunta } from '../types';
import perguntasData from '../../perguntas_sample.json';

export const perguntas: Pergunta[] = perguntasData;

// Função para embaralhar as perguntas
export const embaralharPerguntas = (perguntas: Pergunta[]): Pergunta[] => {
  const perguntasEmbaralhadas = [...perguntas];
  for (let i = perguntasEmbaralhadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [perguntasEmbaralhadas[i], perguntasEmbaralhadas[j]] = [perguntasEmbaralhadas[j], perguntasEmbaralhadas[i]];
  }
  return perguntasEmbaralhadas;
};

// Função para obter perguntas por categoria
export const obterPerguntasPorCategoria = (categoria: string): Pergunta[] => {
  const palavrasChave: { [key: string]: string[] } = {
    'Poluição': ['poluição', 'plástico', 'lixo', 'contaminação', 'esgoto', 'óleo'],
    'Biodiversidade': ['biodiversidade', 'espécies', 'coral', 'recife', 'vida marinha', 'ecossistema'],
    'Mudanças Climáticas': ['clima', 'aquecimento', 'temperatura', 'acidificação', 'carbono', 'efeito estufa'],
    'Conservação': ['conservação', 'proteção', 'sustentável', 'preservação', 'AMP', 'área protegida'],
    'Energia': ['energia', 'renovável', 'eólica', 'marés', 'ondas', 'térmica']
  };

  const palavras = palavrasChave[categoria] || [];
  return perguntas.filter(pergunta => 
    palavras.some(palavra => 
      pergunta.pergunta.toLowerCase().includes(palavra) || 
      pergunta.resposta.toLowerCase().includes(palavra)
    )
  );
};

