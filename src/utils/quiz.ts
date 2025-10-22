import { QuizState, ResultadoQuiz, Pergunta } from '../types';
import { obterDicasPersonalizadas } from '../data/dicas';

export const TEMPO_POR_PERGUNTA = 45; // segundos
export const PONTOS_POR_RESPOSTA_CORRETA = 10;

export const inicializarQuiz = (totalPerguntas: number): QuizState => ({
  perguntaAtual: 0,
  pontuacao: 0,
  respostasCorretas: 0,
  respostasIncorretas: 0,
  tempoRestante: TEMPO_POR_PERGUNTA,
  quizFinalizado: false,
  perguntasRespondidas: new Array(totalPerguntas).fill(false),
});

export const calcularResultado = (
  quizState: QuizState,
  totalPerguntas: number
): ResultadoQuiz => {
  const percentualAcerto = (quizState.respostasCorretas / totalPerguntas) * 100;
  const dicasPersonalizadas = obterDicasPersonalizadas(percentualAcerto);

  return {
    pontuacao: quizState.pontuacao,
    respostasCorretas: quizState.respostasCorretas,
    respostasIncorretas: quizState.respostasIncorretas,
    totalPerguntas,
    percentualAcerto,
    dicasPersonalizadas,
  };
};

export const formatarTempo = (segundos: number): string => {
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;
  return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
};

export const obterMensagemDesempenho = (percentualAcerto: number): string => {
  if (percentualAcerto >= 90) {
    return 'Excelente! Você é um verdadeiro defensor dos oceanos! 🌊';
  } else if (percentualAcerto >= 80) {
    return 'Muito bom! Você tem um ótimo conhecimento sobre cultura oceânica! 🐠';
  } else if (percentualAcerto >= 70) {
    return 'Bom trabalho! Continue aprendendo sobre os oceanos! 🐟';
  } else if (percentualAcerto >= 60) {
    return 'Não está mal! Há espaço para melhorar seu conhecimento oceânico! 🌊';
  } else {
    return 'Continue estudando! Os oceanos precisam de mais defensores como você! 🐙';
  }
};

export const gerarRespostasMultiplas = (pergunta: Pergunta, todasPerguntas: Pergunta[]): string[] => {
  const respostaCorreta = pergunta.resposta;
  const respostasIncorretas: string[] = [];
  
  // Pegar 3 respostas aleatórias de outras perguntas
  const outrasPerguntas = todasPerguntas.filter(p => p.resposta !== respostaCorreta);
  
  while (respostasIncorretas.length < 3 && outrasPerguntas.length > 0) {
    const indiceAleatorio = Math.floor(Math.random() * outrasPerguntas.length);
    const respostaIncorreta = outrasPerguntas[indiceAleatorio].resposta;
    
    if (!respostasIncorretas.includes(respostaIncorreta)) {
      respostasIncorretas.push(respostaIncorreta);
    }
    
    outrasPerguntas.splice(indiceAleatorio, 1);
  }
  
  // Combinar e embaralhar todas as respostas
  const todasRespostas = [respostaCorreta, ...respostasIncorretas];
  
  // Embaralhar as respostas
  for (let i = todasRespostas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [todasRespostas[i], todasRespostas[j]] = [todasRespostas[j], todasRespostas[i]];
  }
  
  return todasRespostas;
};

