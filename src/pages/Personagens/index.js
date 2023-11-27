import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import Personagem from "../../components/Personagem";
import styles from "./styles";
import Loading from "../../components/Loading";

export default function Personagens({ navigation, fetchPersonagens }) {
  const [ personagens, setPersonagens ] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const exec = async () => {
      setIsLoading(true);
      setPersonagens(await fetchPersonagens(pagina));
      setIsLoading(false);
    }

    exec();

    return () => {};
  }, []); // O array vazio assegura que o useEffect seja executado apenas uma vez, equivalente ao componentDidMount

  const getOnPersonagemPressCallback = (id) => {
    return () => navigation.navigate("Personagem", { id });
  }

  if (isLoading) {
    return <Loading />;
  }

  console.log(personagens);

  return (
    <View style={styles.container}>
      <FlatList
        data={personagens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Personagem onPress={getOnPersonagemPressCallback(item.id)} {...item} />}
      />
    </View>
  );
}
