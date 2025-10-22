import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

interface TimerCircleProps {
  tempoRestante: number;
  tempoTotal: number;
}

const TimerCircle: React.FC<TimerCircleProps> = ({ tempoRestante, tempoTotal }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef<any>(null);

  useEffect(() => {
    const percentage = (tempoRestante / tempoTotal) * 100;
    
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [tempoRestante, tempoTotal]);

  const formatarTempo = (segundos: number): string => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
  };

  const getCorTempo = (): string => {
    if (tempoRestante <= 5) return '#e74c3c';
    if (tempoRestante <= 10) return '#f39c12';
    return '#27ae60';
  };

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { borderColor: getCorTempo() }]}>
        <Text style={[styles.tempo, { color: getCorTempo() }]}>
          {formatarTempo(tempoRestante)}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: animatedValue.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
                extrapolate: 'clamp',
              }),
              backgroundColor: getCorTempo(),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  tempo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    width: 200,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
});

export default TimerCircle;

