import { useState, useEffect, useRef } from "react";
import { View, FlatList } from "react-native";
import styles from "./styles";
import Loading from "../../components/Loading";
import PageSelector from "../../components/PageSelector";
import Episodio from "../../components/Episodio";
import { getAllByPage } from "../../services/EpisodeService";

export default function Episodios({ navigation }) {
  const [ episodios, setEpisodios ] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const mounted = useRef(false);

  useEffect(() => {
    const exec = async () => {
      const { result, pages } = await getAllByPage(pagina);

      if (!mounted.current) {
        return;
      }

      setIsLoading(true);
      setEpisodios(result);
      setTotalPaginas(pages);
      setIsLoading(false);
    }

    const unsubscribe = navigation.addListener('focus', () => {
      exec();
    });

    if (!mounted.current) {
      exec();
    }

    mounted.current = true;

    return () => {
      unsubscribe();
      mounted.current = false;
    };
  }, [pagina]);

  const getOnEpisodioPressCallback = (id) => {
    return () => navigation.navigate("Episodio", { id });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={episodios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={
          ({ item }) => 
            <Episodio name={item.name} onPress={getOnEpisodioPressCallback(item.id)} />
        }
      />
      {
        totalPaginas &&
        <PageSelector onPageChange={setPagina} page={pagina} totalPages={totalPaginas} />
      }
    </View>
  );
}
