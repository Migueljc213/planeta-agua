import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { dicas, obterCategoriasDicas, obterDicasPorCategoria } from '../data/dicas';
import DicaCard from '../components/DicaCard';

type DicasScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dicas'>;

interface DicasScreenProps {
  navigation: DicasScreenNavigationProp;
}

const DicasScreen: React.FC<DicasScreenProps> = ({ navigation }) => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Todas');
  const categorias = ['Todas', ...obterCategoriasDicas()];

  const dicasFiltradas = categoriaSelecionada === 'Todas' 
    ? dicas 
    : obterDicasPorCategoria(categoriaSelecionada);

  const renderDica = ({ item, index }: { item: any; index: number }) => (
    <DicaCard dica={item} index={index} />
  );

  const renderCategoriaButton = (categoria: string) => (
    <TouchableOpacity
      key={categoria}
      style={[
        styles.categoriaButton,
        categoriaSelecionada === categoria && styles.categoriaSelecionada
      ]}
      onPress={() => setCategoriaSelecionada(categoria)}
    >
      <Text style={[
        styles.categoriaTexto,
        categoriaSelecionada === categoria && styles.categoriaTextoSelecionado
      ]}>
        {categoria}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[
      styles.container,
      Platform.OS === 'web' && { height: '100vh' as any, overflow: 'hidden' as any }
    ]}>
      <View style={styles.header}>
        <Text style={styles.title}>💧 Dicas de Economia de Água</Text>
        <Text style={styles.subtitle}>
          Pequenas ações que fazem uma grande diferença para o planeta
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={Platform.OS === 'web'}
        style={styles.categoriasContainer}
        contentContainerStyle={styles.categoriasContent}
        bounces={Platform.OS !== 'web'}
      >
        {categorias.map(renderCategoriaButton)}
      </ScrollView>

      <View style={styles.estatisticasContainer}>
        <View style={styles.estatistica}>
          <Text style={styles.estatisticaNumero}>{dicasFiltradas.length}</Text>
          <Text style={styles.estatisticaLabel}>
            {categoriaSelecionada === 'Todas' ? 'Total de Dicas' : 'Dicas da Categoria'}
          </Text>
        </View>
        {categoriaSelecionada === 'Todas' && (
          <View style={styles.estatistica}>
            <Text style={styles.estatisticaNumero}>{categorias.length - 1}</Text>
            <Text style={styles.estatisticaLabel}>Categorias</Text>
          </View>
        )}
      </View>

      <FlatList
        data={dicasFiltradas}
        renderItem={renderDica}
        keyExtractor={(item, index) => `${item.categoria}-${index}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={Platform.OS === 'web'}
        bounces={Platform.OS !== 'web'}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🌍 Cada gota economizada ajuda a preservar nosso planeta azul!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5aa0',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  categoriasContainer: {
    maxHeight: 60,
    marginVertical: 15,
  },
  categoriasContent: {
    paddingHorizontal: 20,
  },
  categoriaButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoriaSelecionada: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  categoriaTexto: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  categoriaTextoSelecionado: {
    color: '#ffffff',
    fontWeight: '600',
  },
  estatisticasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  estatistica: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  estatisticaNumero: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
  },
  estatisticaLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footerText: {
    fontSize: 14,
    color: '#2c3e50',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default DicasScreen;

