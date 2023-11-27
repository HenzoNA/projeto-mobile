import { useEffect, useState } from "react";
import styles from "./styles";
import { Image, Text, View } from "react-native";
import { addAsFavorite, getById, removeAsFavorite } from "../../services/PersonagemService";
import Loading from "../../components/Loading";
import FavoriteButton from "../../components/FavoriteButton";

export default function PersonagemPage({ navigation, route }) {
  const { id } = route?.params;
  const [isLoading, setIsLoading] = useState(true);
  const [ personagem, setPersonagem ] = useState();

  useEffect(() => {
    const exec = async () => {
      setIsLoading(true);
      setPersonagem(await getById(id));
      setIsLoading(false);
    }

    exec();

    return () => {};
  }, []);

  function handleFavorite(isFavorite) {
    if (isFavorite) {
      removeAsFavorite(id);
    } else {
      addAsFavorite(id);
    }
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
        Apareceu no episódio {personagem.episode}
      </Text>
    </View>
  );
};