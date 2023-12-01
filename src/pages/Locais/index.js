import { useState, useEffect, useRef } from "react";
import { View, FlatList } from "react-native";
import Local from "../../components/Local";
import styles from "./styles";
import Loading from "../../components/Loading";
import PageSelector from "../../components/PageSelector";
import { getAllByPage } from "../../services/LocationService";

export default function Locais({ navigation }) {
  const [ locais, setLocais ] = useState();
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
      setLocais(result);
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

  const getOnLocalPressCallback = (id) => {
    return () => navigation.navigate("Local", { id });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={locais}
        keyExtractor={(item) => item.id.toString()}
        renderItem={
          ({ item }) =>
            <Local 
              onPress={getOnLocalPressCallback(item.id)} 
              name={item.name}
              dimension={item.dimension} 
            />
        }
      />
      {
        totalPaginas &&
        <PageSelector onPageChange={setPagina} page={pagina} totalPages={totalPaginas} />
      }
    </View>
  );
}
