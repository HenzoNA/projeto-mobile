import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import Router from './src/router';

export default function App() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <NavigationContainer theme={DefaultTheme}>
        <Router />
      </NavigationContainer>
    </PaperProvider>
  );
}