import { useState, useEffect, useRef } from "react";
import { View, FlatList } from "react-native";
import Personagem from "../../components/Personagem";
import styles from "./styles";
import Loading from "../../components/Loading";
import { addAsFavorite, removeAsFavorite } from "../../services/PersonagemService";
import PageSelector from "../../components/PageSelector";

export default function Personagens({ navigation, fetchPersonagens }) {
  const [ personagens, setPersonagens ] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const mounted = useRef(false);

  useEffect(() => {
    const exec = async () => {
      const { result, pages } = await fetchPersonagens(pagina);

      if (!mounted.current) {
        return;
      }

      setIsLoading(true);
      setPersonagens(result);
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

  const getOnPersonagemPressCallback = (id) => {
    return () => navigation.navigate("Personagem", { id });
  }

  const getOnFavoriteCallback = (id) => {
    return () => {
      const personagemIndex = personagens.findIndex(({ id: personagemId }) => id == personagemId);

      const newIsFavorite = !personagens[personagemIndex].isFavorite;

      if (newIsFavorite) {
        addAsFavorite(id);
      } else {
        removeAsFavorite(id);
      }

      personagens[personagemIndex].isFavorite = newIsFavorite;
      setPersonagens([ ...personagens ]);
    }
  } 

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={personagens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={
          ({ item }) => 
            <Personagem onPress={getOnPersonagemPressCallback(item.id)} onFavorite={getOnFavoriteCallback(item.id)} {...item} />
        }
      />
      {
        totalPaginas &&
        <PageSelector onPageChange={setPagina} page={pagina} totalPages={totalPaginas} />
      }
    </View>
  );
}
