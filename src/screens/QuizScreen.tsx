import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  BackHandler,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, QuizState, Pergunta } from '../types';
import { perguntas, embaralharPerguntas } from '../data/perguntas';
import { 
  inicializarQuiz, 
  calcularResultado, 
  TEMPO_POR_PERGUNTA,
  PONTOS_POR_RESPOSTA_CORRETA,
  gerarRespostasMultiplas 
} from '../utils/quiz';
import QuizCard from '../components/QuizCard';

type QuizScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>;

interface QuizScreenProps {
  navigation: QuizScreenNavigationProp;
}

const TOTAL_PERGUNTAS = 20; // Limitando a 20 perguntas para uma experiência melhor

const QuizScreen: React.FC<QuizScreenProps> = ({ navigation }) => {
  const [quizState, setQuizState] = useState<QuizState>(inicializarQuiz(TOTAL_PERGUNTAS));
  const [perguntasQuiz, setPerguntasQuiz] = useState<Pergunta[]>([]);
  const [respostasMultiplas, setRespostasMultiplas] = useState<string[]>([]);
  const [respostaCorreta, setRespostaCorreta] = useState<string>('');
  const [feedbackVisivel, setFeedbackVisivel] = useState<boolean>(false);
  const [ultimaRespostaCorreta, setUltimaRespostaCorreta] = useState<boolean>(false);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Embaralhar e selecionar perguntas para o quiz
    const perguntasEmbaralhadas = embaralharPerguntas(perguntas);
    const perguntasSelecionadas = perguntasEmbaralhadas.slice(0, TOTAL_PERGUNTAS);
    setPerguntasQuiz(perguntasSelecionadas);
    
    // Configurar primeira pergunta
    if (perguntasSelecionadas.length > 0) {
      configurarPergunta(perguntasSelecionadas[0], perguntasEmbaralhadas);
    }

    // Configurar handler para botão voltar
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    // Iniciar timer quando o quiz começar
    if (!quizState.quizFinalizado && !feedbackVisivel) {
      iniciarTimer();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quizState.perguntaAtual, feedbackVisivel]);

  const handleBackPress = (): boolean => {
    Alert.alert(
      'Sair do Quiz',
      'Tem certeza que deseja sair? Seu progresso será perdido.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: () => navigation.goBack() },
      ]
    );
    return true;
  };

  const configurarPergunta = (pergunta: Pergunta, todasPerguntas: Pergunta[]) => {
    const opcoes = gerarRespostasMultiplas(pergunta, todasPerguntas);
    setRespostasMultiplas(opcoes);
    setRespostaCorreta(pergunta.resposta);
  };

  const iniciarTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setQuizState(prevState => {
        if (prevState.tempoRestante <= 1) {
          // Tempo esgotado - processar fora do setState
          setTimeout(() => processarResposta('', true), 0);
          return prevState;
        }
        return {
          ...prevState,
          tempoRestante: prevState.tempoRestante - 1,
        };
      });
    }, 1000);
  };

  const processarResposta = (respostaSelecionada: string, tempoEsgotado: boolean = false) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const respostaEstaCorreta = respostaSelecionada === respostaCorreta;
    setUltimaRespostaCorreta(respostaEstaCorreta && !tempoEsgotado);
    setFeedbackVisivel(true);

    setQuizState(prevState => {
      const novoState = {
        ...prevState,
        perguntasRespondidas: prevState.perguntasRespondidas.map((respondida, index) =>
          index === prevState.perguntaAtual ? true : respondida
        ),
      };

      if (respostaEstaCorreta && !tempoEsgotado) {
        novoState.respostasCorretas += 1;
        novoState.pontuacao += PONTOS_POR_RESPOSTA_CORRETA;
      } else {
        novoState.respostasIncorretas += 1;
      }

      return novoState;
    });

    // Mostrar feedback por 2 segundos
    setTimeout(() => {
      proximaPergunta();
    }, 2000);
  };

  const proximaPergunta = () => {
    setFeedbackVisivel(false);
    
    setQuizState(prevState => {
      const proximoIndice = prevState.perguntaAtual + 1;
      
      if (proximoIndice >= TOTAL_PERGUNTAS) {
        // Quiz finalizado - navegar fora do setState
        const resultado = calcularResultado(prevState, TOTAL_PERGUNTAS);
        setTimeout(() => navigation.replace('Resultado', { resultado }), 0);
        return { ...prevState, quizFinalizado: true };
      } else {
        // Próxima pergunta
        const proximaPergunta = perguntasQuiz[proximoIndice];
        configurarPergunta(proximaPergunta, perguntas);
        
        return {
          ...prevState,
          perguntaAtual: proximoIndice,
          tempoRestante: TEMPO_POR_PERGUNTA,
        };
      }
    });
  };

  if (perguntasQuiz.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando quiz...</Text>
      </View>
    );
  }

  if (feedbackVisivel) {
    return (
      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackIcon}>
          {ultimaRespostaCorreta ? '✅' : '❌'}
        </Text>
        <Text style={styles.feedbackText}>
          {ultimaRespostaCorreta ? 'Correto!' : 'Incorreto!'}
        </Text>
        {!ultimaRespostaCorreta && (
          <View style={styles.respostaCorretaContainer}>
            <Text style={styles.respostaCorretaLabel}>Resposta correta:</Text>
            <Text style={styles.respostaCorretaTexto}>{respostaCorreta}</Text>
          </View>
        )}
        <Text style={styles.pontuacaoFeedback}>
          Pontuação: {quizState.pontuacao}
        </Text>
      </View>
    );
  }

  const perguntaAtual = perguntasQuiz[quizState.perguntaAtual];

  return (
    <View style={[
      styles.container,
      Platform.OS === 'web' && { height: '100vh' as any, overflow: 'auto' as any }
    ]}>
      <QuizCard
        pergunta={perguntaAtual.pergunta}
        opcoes={respostasMultiplas}
        onResposta={processarResposta}
        tempoRestante={quizState.tempoRestante}
        perguntaAtual={quizState.perguntaAtual}
        totalPerguntas={TOTAL_PERGUNTAS}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  loadingText: {
    fontSize: 18,
    color: '#2c5aa0',
    fontWeight: '600',
  },
  feedbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  feedbackIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  feedbackText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  respostaCorretaContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  respostaCorretaLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e74c3c',
    marginBottom: 8,
    textAlign: 'center',
  },
  respostaCorretaTexto: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 22,
  },
  pontuacaoFeedback: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
  },
});

export default QuizScreen;

