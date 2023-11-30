import { FAB } from "react-native-paper";
import styles from "./styles";

export default function FavoriteButton({ isFavorite, style, ...props }) {
  
  const icon = isFavorite
    ? "cards-heart"
    : "cards-heart-outline";

  const color = isFavorite
    ? "#FFFFFF"
    : "#f24257";

  const rippleColor = isFavorite
    ? "#f24257"
    : "#FFFFFF";

  let selectedStyle = isFavorite
    ? styles.active
    : styles.inactive;

  if (style) {
    selectedStyle = { ...style, ...selectedStyle };
  }

  return (
    <FAB icon={icon} color={color} rippleColor={rippleColor} style={selectedStyle} animated {...props} />
  );
}