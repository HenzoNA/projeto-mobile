import { useEffect, useState } from "react";
import styles from "./styles";
import { Text, View } from "react-native";
import Loading from "../../components/Loading";
import { getById } from "../../services/LocationService";

export default function LocalPage({ route }) {
  const { id } = route?.params;
  const [isLoading, setIsLoading] = useState(true);
  const [ local, setLocal ] = useState();

  useEffect(() => {
    const exec = async () => {
      setIsLoading(true);
      setLocal(await getById(id));
      setIsLoading(false);
    }

    exec();

    return () => {};
  }, []);

  if (isLoading || !local) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{local.name}</Text>
      <Text style={styles.description}>
        {local.type}
      </Text>
      <Text style={styles.episode}>
        {local.dimension}
      </Text>
    </View>
  );
};