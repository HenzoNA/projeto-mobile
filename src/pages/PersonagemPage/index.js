import { useEffect, useState } from "react";
import styles from "./styles";
import { Image, Text, View } from "react-native";
import { addAsFavorite, getById, removeAsFavorite } from "../../services/PersonagemService";
import Loading from "../../components/Loading";
import FavoriteButton from "../../components/FavoriteButton";
import { getByUrlList } from "../../services/EpisodeService";
import Episodio from "../../components/Episodio";
import { FlatList } from "react-native";

export default function PersonagemPage({ navigation, route }) {
  const { id } = route?.params;
  const [isLoading, setIsLoading] = useState(true);
  const [ personagem, setPersonagem ] = useState();
  const [ episodios, setEpisodios ] = useState();

  useEffect(() => {
    const exec = async () => {
      setIsLoading(true);
      const response = await getById(id);
      setPersonagem(response);
      const eps = await getByUrlList(response.episode);
      setEpisodios(eps.result)
      setIsLoading(false);
    }

    exec();

    return () => {};
  }, []);

  function handleFavorite() {
    const isFavorite = personagem.isFavorite;

    if (isFavorite) {
      removeAsFavorite(id);
    } else {
      addAsFavorite(id);
    }

    personagem.isFavorite = !isFavorite;
    setPersonagem({ ...personagem });
  }

  function getEpisodioOnPress(id) {
    return () => navigation.navigate("EpisodiosArea", { screen: "Episodio", params: { id } });
  }

  if (isLoading || !personagem) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FavoriteButton 
        style={styles.favorite} 
        onPress={handleFavorite} 
        isFavorite={personagem.isFavorite} 
      />
      <Image
        style={styles.image}
        source={{ uri: personagem.image }}
      />
      <Text style={styles.title}>{personagem.name}</Text>
      <Text style={styles.description}>
        {personagem.species} {personagem.status}
      </Text>
      <Text style={styles.episode}>
        Apareceu no(s) episódio(s)
      </Text>
      <FlatList 
        data={episodios}
        keyExtractor={episodio => episodio.id}
        renderItem={({ item }) =>
          <Episodio name={item.name} onPress={getEpisodioOnPress(item.id)} />
        }
      />
    </View>
  );
};