import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <ScrollView 
      style={[
        styles.container,
        Platform.OS === 'web' && { height: '100vh' as any, overflow: 'auto' as any }
      ]} 
      contentContainerStyle={[
        styles.contentContainer,
        Platform.OS === 'web' && { minHeight: '100vh' as any }
      ]}
      showsVerticalScrollIndicator={Platform.OS === 'web'}
      bounces={Platform.OS !== 'web'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>🌊 Planeta Água</Text>
        <Text style={styles.subtitle}>
          Cultura oceânica para enfrentar as mudanças climáticas
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>🧠</Text>
          <Text style={styles.infoTitle}>1000 Perguntas</Text>
          <Text style={styles.infoDescription}>
            Teste seus conhecimentos sobre cultura oceânica e mudanças climáticas
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>💧</Text>
          <Text style={styles.infoTitle}>Dicas Personalizadas</Text>
          <Text style={styles.infoDescription}>
            Receba dicas de economia de água baseadas no seu desempenho
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>🏆</Text>
          <Text style={styles.infoTitle}>Sistema de Pontuação</Text>
          <Text style={styles.infoDescription}>
            Ganhe pontos e acompanhe seu progresso no aprendizado
          </Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Quiz')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>🎯 Iniciar Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Dicas')}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>💡 Ver Dicas de Economia</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🌍 Juntos podemos proteger nossos oceanos e enfrentar as mudanças climáticas!
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
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c5aa0',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  infoContainer: {
    marginBottom: 40,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  infoDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonsContainer: {
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#3498db',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#3498db',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  secondaryButtonText: {
    color: '#3498db',
    fontSize: 18,
    fontWeight: 'bold',
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
    shadowRadius: 3.84,
    elevation: 5,
  },
  footerText: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },
});

export default HomeScreen;

