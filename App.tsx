import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import { RootStackParamList } from './src/types';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultadoScreen from './src/screens/ResultadoScreen';
import DicasScreen from './src/screens/DicasScreen';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f8ff" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#3498db',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: '🌊 Planeta Água',
              headerStyle: {
                backgroundColor: '#2c5aa0',
              },
            }}
          />
          <Stack.Screen
            name="Quiz"
            component={QuizScreen}
            options={{
              title: '🧠 Quiz Oceânico',
              headerLeft: () => null, // Remove o botão voltar durante o quiz
              gestureEnabled: false, // Desabilita o gesto de voltar
            }}
          />
          <Stack.Screen
            name="Resultado"
            component={ResultadoScreen}
            options={{
              title: '🏆 Resultado',
              headerLeft: () => null, // Remove o botão voltar na tela de resultado
              gestureEnabled: false, // Desabilita o gesto de voltar
            }}
          />
          <Stack.Screen
            name="Dicas"
            component={DicasScreen}
            options={{
              title: '💧 Dicas de Economia',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
