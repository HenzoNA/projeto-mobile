import { IconButton, Surface, Text } from "react-native-paper";
import styles from "./styles";
import { View } from "react-native";

export default function PageSelector({ page, onPageChange, totalPages }) {

  function handlePageChange(modifier) {
    const newPage = page + modifier;

    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    onPageChange(newPage);
  }

  return (
    <View style={styles.container}>
      <Surface mode="elevated" elevation={1} style={styles.surface}>
        <IconButton icon="chevron-left" style={styles.button} onPress={() => handlePageChange(-1)} />
        <Text style={styles.page}>{page} / {totalPages}</Text>
        <IconButton icon="chevron-right" style={styles.button} onPress={() => handlePageChange(1)} />
      </Surface>
    </View>
  );
}