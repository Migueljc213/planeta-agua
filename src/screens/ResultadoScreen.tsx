import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { obterMensagemDesempenho } from '../utils/quiz';
import DicaCard from '../components/DicaCard';

type ResultadoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Resultado'>;
type ResultadoScreenRouteProp = RouteProp<RootStackParamList, 'Resultado'>;

interface ResultadoScreenProps {
  navigation: ResultadoScreenNavigationProp;
  route: ResultadoScreenRouteProp;
}

const { width } = Dimensions.get('window');

const ResultadoScreen: React.FC<ResultadoScreenProps> = ({ navigation, route }) => {
  const { resultado } = route.params;

  const getCorDesempenho = (): string => {
    if (resultado.percentualAcerto >= 80) return '#27ae60';
    if (resultado.percentualAcerto >= 60) return '#f39c12';
    return '#e74c3c';
  };

  const getIconeDesempenho = (): string => {
    if (resultado.percentualAcerto >= 90) return '🏆';
    if (resultado.percentualAcerto >= 80) return '🥇';
    if (resultado.percentualAcerto >= 70) return '🥈';
    if (resultado.percentualAcerto >= 60) return '🥉';
    return '📚';
  };

  const renderEstatistica = (titulo: string, valor: string | number, icone: string) => (
    <View style={styles.estatisticaCard}>
      <Text style={styles.estatisticaIcone}>{icone}</Text>
      <Text style={styles.estatisticaValor}>{valor}</Text>
      <Text style={styles.estatisticaTitulo}>{titulo}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.iconeResultado}>{getIconeDesempenho()}</Text>
        <Text style={styles.titulo}>Quiz Finalizado!</Text>
        <Text style={[styles.percentual, { color: getCorDesempenho() }]}>
          {resultado.percentualAcerto.toFixed(1)}%
        </Text>
        <Text style={styles.mensagem}>
          {obterMensagemDesempenho(resultado.percentualAcerto)}
        </Text>
      </View>

      <View style={styles.estatisticasContainer}>
        {renderEstatistica('Pontuação', resultado.pontuacao, '⭐')}
        {renderEstatistica('Corretas', resultado.respostasCorretas, '✅')}
        {renderEstatistica('Incorretas', resultado.respostasIncorretas, '❌')}
        {renderEstatistica('Total', resultado.totalPerguntas, '📊')}
      </View>

      <View style={styles.progressoContainer}>
        <Text style={styles.progressoTitulo}>Seu Desempenho</Text>
        <View style={styles.progressoBar}>
          <View 
            style={[
              styles.progresso, 
              { 
                width: `${resultado.percentualAcerto}%`,
                backgroundColor: getCorDesempenho()
              }
            ]} 
          />
        </View>
        <Text style={styles.progressoTexto}>
          {resultado.respostasCorretas} de {resultado.totalPerguntas} perguntas corretas
        </Text>
      </View>

      <View style={styles.dicasContainer}>
        <Text style={styles.dicasTitulo}>
          💧 Suas Dicas Personalizadas de Economia de Água
        </Text>
        <Text style={styles.dicasSubtitulo}>
          Baseadas no seu desempenho no quiz, aqui estão algumas dicas especiais para você:
        </Text>
        
        {resultado.dicasPersonalizadas.map((dica, index) => (
          <DicaCard key={index} dica={dica} index={index} />
        ))}
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botaoPrimario}
          onPress={() => navigation.navigate('Quiz')}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotaoPrimario}>🔄 Jogar Novamente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={() => navigation.navigate('Dicas')}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotaoSecundario}>💡 Ver Todas as Dicas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoTerciario}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotaoTerciario}>🏠 Voltar ao Início</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTexto}>
          🌊 Continue aprendendo e ajudando a proteger nossos oceanos!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  iconeResultado: {
    fontSize: 60,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  percentual: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  mensagem: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  estatisticasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  estatisticaCard: {
    backgroundColor: '#ffffff',
    width: (width - 50) / 2,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  estatisticaIcone: {
    fontSize: 24,
    marginBottom: 8,
  },
  estatisticaValor: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  estatisticaTitulo: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  progressoContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  progressoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  progressoBar: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progresso: {
    height: '100%',
    borderRadius: 6,
  },
  progressoTexto: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  dicasContainer: {
    marginBottom: 25,
  },
  dicasTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  dicasSubtitulo: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  botoesContainer: {
    marginBottom: 20,
  },
  botaoPrimario: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  textoBotaoPrimario: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botaoSecundario: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#3498db',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  textoBotaoSecundario: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botaoTerciario: {
    backgroundColor: '#ecf0f1',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  textoBotaoTerciario: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  footerTexto: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },
});

export default ResultadoScreen;

