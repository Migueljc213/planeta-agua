import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

interface QuizCardProps {
  pergunta: string;
  opcoes: string[];
  onResposta: (resposta: string) => void;
  tempoRestante: number;
  perguntaAtual: number;
  totalPerguntas: number;
}

const { width } = Dimensions.get('window');

const QuizCard: React.FC<QuizCardProps> = ({
  pergunta,
  opcoes,
  onResposta,
  tempoRestante,
  perguntaAtual,
  totalPerguntas,
}) => {
  const formatarTempo = (segundos: number): string => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.contador}>
          {perguntaAtual + 1} de {totalPerguntas}
        </Text>
        <Text style={[styles.tempo, tempoRestante <= 10 && styles.tempoUrgente]}>
          ⏰ {formatarTempo(tempoRestante)}
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progress, 
            { width: `${((perguntaAtual + 1) / totalPerguntas) * 100}%` }
          ]} 
        />
      </View>

      <View style={styles.perguntaContainer}>
        <Text style={styles.pergunta}>{pergunta}</Text>
      </View>

      <View style={styles.opcoesContainer}>
        {opcoes.map((opcao, index) => (
          <TouchableOpacity
            key={index}
            style={styles.opcaoButton}
            onPress={() => onResposta(opcao)}
            activeOpacity={0.7}
          >
            <Text style={styles.opcaoTexto}>{opcao}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  contador: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c5aa0',
  },
  tempo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c5aa0',
  },
  tempoUrgente: {
    color: '#e74c3c',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 30,
  },
  progress: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  perguntaContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pergunta: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    lineHeight: 26,
    textAlign: 'center',
  },
  opcoesContainer: {
    flex: 1,
  },
  opcaoButton: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#3498db',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  opcaoTexto: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default QuizCard;

