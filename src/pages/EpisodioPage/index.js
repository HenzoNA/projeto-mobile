import { useEffect, useState } from "react";
import styles from "./styles";
import { Text, View } from "react-native";
import Loading from "../../components/Loading";
import { getById } from "../../services/EpisodeService";

export default function EpisodioPage({ route }) {
  console.log(route)
  const { id } = route?.params;
  const [isLoading, setIsLoading] = useState(true);
  const [ episodio, setEpisodio ] = useState();

  useEffect(() => {
    const exec = async () => {
      setIsLoading(true);
      setEpisodio(await getById(id));
      setIsLoading(false);
    }

    exec();

    return () => {};
  }, []);

  if (isLoading || !episodio) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{episodio.name}</Text>
      <Text style={styles.description}>
        {episodio.air_date}
      </Text>
      <Text style={styles.episode}>
        {episodio.episode}
      </Text>
    </View>
  );
};