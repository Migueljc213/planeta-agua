import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

interface FeedbackModalProps {
  visible: boolean;
  isCorrect: boolean;
  respostaCorreta?: string;
  pontuacao: number;
}

const { width, height } = Dimensions.get('window');

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  visible,
  isCorrect,
  respostaCorreta,
  pontuacao,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View 
      style={[
        styles.overlay,
        {
          opacity: fadeAnim,
        }
      ]}
    >
      <Animated.View 
        style={[
          styles.modal,
          {
            transform: [{ scale: scaleAnim }],
            backgroundColor: isCorrect ? '#e8f5e8' : '#ffeaea',
            borderColor: isCorrect ? '#27ae60' : '#e74c3c',
          }
        ]}
      >
        <Text style={styles.icon}>
          {isCorrect ? '🎉' : '😔'}
        </Text>
        
        <Text style={[
          styles.title,
          { color: isCorrect ? '#27ae60' : '#e74c3c' }
        ]}>
          {isCorrect ? 'Parabéns!' : 'Ops!'}
        </Text>
        
        <Text style={styles.message}>
          {isCorrect 
            ? 'Resposta correta! Você está indo muito bem!' 
            : 'Resposta incorreta. Continue tentando!'
          }
        </Text>

        {!isCorrect && respostaCorreta && (
          <View style={styles.respostaCorretaContainer}>
            <Text style={styles.respostaCorretaLabel}>Resposta correta:</Text>
            <Text style={styles.respostaCorretaTexto}>{respostaCorreta}</Text>
          </View>
        )}

        <View style={styles.pontuacaoContainer}>
          <Text style={styles.pontuacaoLabel}>Pontuação atual:</Text>
          <Text style={[
            styles.pontuacao,
            { color: isCorrect ? '#27ae60' : '#e74c3c' }
          ]}>
            {pontuacao} pontos
          </Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    width: width * 0.85,
    padding: 30,
    borderRadius: 20,
    borderWidth: 3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  icon: {
    fontSize: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  respostaCorretaContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  respostaCorretaLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e74c3c',
    marginBottom: 5,
    textAlign: 'center',
  },
  respostaCorretaTexto: {
    fontSize: 14,
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 20,
  },
  pontuacaoContainer: {
    alignItems: 'center',
  },
  pontuacaoLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  pontuacao: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default FeedbackModal;

