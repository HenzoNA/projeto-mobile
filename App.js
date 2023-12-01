import { NavigationContainer, DefaultTheme as RNDefault } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { PaperProvider, DefaultTheme as RNPDefault } from 'react-native-paper';
import Router from './src/router';

export default function App() {
  return (
    <PaperProvider theme={RNPDefault}>
      <NavigationContainer theme={RNDefault}>
        <Router />
      </NavigationContainer>
    </PaperProvider>
  );
}