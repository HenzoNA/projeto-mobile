import { createStackNavigator } from "@react-navigation/stack";
import PersonagemPage from "./pages/PersonagemPage";
import Personagens from "./pages/Personagens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { getAllByPage, getAllFavorites } from "./services/PersonagemService";

const PersonagensStack = createStackNavigator();
const FavoritosStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function PersonagensComponentFactory(fetcher) {
  return (props) => <Personagens fetchPersonagens={fetcher} {...props} />;
}

function PersonagensStackScreen() {
  const personagemFetcher = getAllByPage;

  return (
    <PersonagensStack.Navigator initialRouteName="Personagens">
      <PersonagensStack.Screen name="Personagens" component={PersonagensComponentFactory(getAllByPage)} />
      <PersonagensStack.Screen name="Personagem" component={PersonagemPage} />
    </PersonagensStack.Navigator>
  );
}

function FavoritosStackScreen() {
  const favoritosFetcher = getAllFavorites;

  return (
    <FavoritosStack.Navigator initialRouteName="Favoritos">
      <FavoritosStack.Screen name="Favoritos" component={PersonagensComponentFactory(getAllFavorites)} />
      <FavoritosStack.Screen name="Favorito" component={PersonagemPage} />
    </FavoritosStack.Navigator>
  );
}

export default function Router() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Personagens">
      <Tab.Screen name="Personagens" component={PersonagensStackScreen} options={{ tabBarIcon: () => <Icon source="person" size={10} /> }} />
      <Tab.Screen name="Favoritos" component={FavoritosStackScreen} />
    </Tab.Navigator>
  );
}