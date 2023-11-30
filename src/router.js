import { createStackNavigator } from "@react-navigation/stack";
import PersonagemPage from "./pages/PersonagemPage";
import Personagens from "./pages/Personagens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getAllByPage, getAllFavorites } from "./services/PersonagemService";
import EpisodioPage from "./pages/EpisodioPage";
import Episodios from "./pages/Episodios";
import Locais from "./pages/Locais";
import LocalPage from "./pages/LocalPage";

const PersonagensStack = createStackNavigator();
const FavoritosStack = createStackNavigator();
const EpisodiosStack = createStackNavigator();
const LocaisStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function PersonagensComponentFactory(fetcher) {
  return (props) => <Personagens fetchPersonagens={fetcher} {...props} />;
}

function PersonagensStackScreen() {
  return (
    <PersonagensStack.Navigator initialRouteName="Personagens">
      <PersonagensStack.Screen name="Personagens" component={PersonagensComponentFactory(getAllByPage)} />
      <PersonagensStack.Screen name="Personagem" component={PersonagemPage} />
    </PersonagensStack.Navigator>
  );
}

function FavoritosStackScreen() {
  return (
    <FavoritosStack.Navigator initialRouteName="Favoritos">
      <FavoritosStack.Screen name="Favoritos" component={PersonagensComponentFactory(getAllFavorites)} />
      <FavoritosStack.Screen name="Favorito" component={PersonagemPage} />
    </FavoritosStack.Navigator>
  );
}

function EpisodiosStackScreen() {
  return (
    <EpisodiosStack.Navigator initialRouteName="Episodios">
      <EpisodiosStack.Screen name="Episodios" component={Episodios} />
      <EpisodiosStack.Screen name="Episodio" component={EpisodioPage} />
    </EpisodiosStack.Navigator>
  );
}

function LocaisStackScreen() {
  return (
    <LocaisStack.Navigator initialRouteName="Locais">
      <LocaisStack.Screen name="Locais" component={Locais} />
      <LocaisStack.Screen name="Local" component={LocalPage} />
    </LocaisStack.Navigator>
  );
}

export default function Router() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Personagens">
      <Tab.Screen name="PersonagensArea" component={PersonagensStackScreen} options={{ title: "Personagens" }} />
      <Tab.Screen name="FavoritosArea" component={FavoritosStackScreen} options={{ title: "Favoritos" }} />
      <Tab.Screen name="EpisodiosArea" component={EpisodiosStackScreen} options={{ title: "Episodios" }} />
      <Tab.Screen name="LocationsArea" component={LocaisStackScreen} options={{ title: "Locations" }} />
    </Tab.Navigator>
  );
}