import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { DicaEconomiaAgua } from '../types';

interface DicaCardProps {
  dica: DicaEconomiaAgua;
  index: number;
}

const DicaCard: React.FC<DicaCardProps> = ({ dica, index }) => {
  const getCategoriaIcon = (categoria: string): string => {
    const icons: { [key: string]: string } = {
      'Banho': '🚿',
      'Higiene Pessoal': '🦷',
      'Manutenção': '🔧',
      'Eletrodomésticos': '🏠',
      'Cozinha': '🍽️',
      'Equipamentos': '⚙️',
      'Limpeza Externa': '🧹',
      'Jardinagem': '🌱',
      'Banheiro': '🚽',
      'Lazer': '🎯',
    };
    return icons[categoria] || '💧';
  };

  const getCategoriaColor = (categoria: string): string => {
    const colors: { [key: string]: string } = {
      'Banho': '#3498db',
      'Higiene Pessoal': '#9b59b6',
      'Manutenção': '#e67e22',
      'Eletrodomésticos': '#2ecc71',
      'Cozinha': '#f39c12',
      'Equipamentos': '#34495e',
      'Limpeza Externa': '#1abc9c',
      'Jardinagem': '#27ae60',
      'Banheiro': '#3498db',
      'Lazer': '#e74c3c',
    };
    return colors[categoria] || '#3498db';
  };

  return (
    <View style={[styles.container, { borderLeftColor: getCategoriaColor(dica.categoria) }]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{getCategoriaIcon(dica.categoria)}</Text>
        <Text style={[styles.categoria, { color: getCategoriaColor(dica.categoria) }]}>
          {dica.categoria}
        </Text>
        <Text style={styles.numero}>#{index + 1}</Text>
      </View>
      <Text style={styles.dica}>{dica.dica}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoria: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  numero: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  dica: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 22,
  },
});

export default DicaCard;

