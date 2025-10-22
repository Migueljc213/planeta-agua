export interface Pergunta {
  pergunta: string;
  resposta: string;
}

export interface DicaEconomiaAgua {
  dica: string;
  categoria: string;
}

export interface QuizState {
  perguntaAtual: number;
  pontuacao: number;
  respostasCorretas: number;
  respostasIncorretas: number;
  tempoRestante: number;
  quizFinalizado: boolean;
  perguntasRespondidas: boolean[];
}

export interface ResultadoQuiz {
  pontuacao: number;
  respostasCorretas: number;
  respostasIncorretas: number;
  totalPerguntas: number;
  percentualAcerto: number;
  dicasPersonalizadas: DicaEconomiaAgua[];
}

export type RootStackParamList = {
  Home: undefined;
  Quiz: undefined;
  Resultado: {
    resultado: ResultadoQuiz;
  };
  Dicas: undefined;
};

