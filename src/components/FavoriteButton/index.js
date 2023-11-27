import { useState } from "react";
import { FAB } from "react-native-paper";
import styles from "./styles";
import _ from "lodash";

export default function FavoriteButton({ isFavorite, onPress, style, ...props }) {
  const [ innerIsFavorite, setIsFavorite ] = useState(!!isFavorite);

  const onPressWrapper = () => {
    setIsFavorite(!innerIsFavorite);
    
    if (onPress) {
      onPress(innerIsFavorite);
    }
  };

  const icon = innerIsFavorite
    ? "cards-heart"
    : "cards-heart-outline";

  const color = innerIsFavorite
    ? "#FFFFFF"
    : "#f24257";

  const rippleColor = innerIsFavorite
    ? "#f24257"
    : "#FFFFFF";

  let selectedStyle = innerIsFavorite
    ? styles.active
    : styles.inactive;

  if (style) {
    selectedStyle = { ...style, ...selectedStyle };
  }

  return (
    <FAB icon={icon} color={color} rippleColor={rippleColor} style={selectedStyle} animated onPress={onPressWrapper} {...props} />
  );
}