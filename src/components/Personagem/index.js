import React from 'react';
import { Card, Paragraph } from 'react-native-paper';
import styles from "./styles";
import FavoriteButton from '../FavoriteButton';


export default function Personagem({ id, name, gender, status, image, isFavorite, onFavorite, ...props }) {
  
  return (
    <Card style={styles.cardContainer} {...props} >
      
      <Card.Cover source={{ uri: image }} />
      <Card.Title 
        title={name} 
        right={() => <FavoriteButton isFavorite={isFavorite} onPress={onFavorite} />} 
      />
      <Card.Content>
        <Paragraph>{gender}</Paragraph>
        <Paragraph>{status}</Paragraph>
      </Card.Content>
    </Card>
  );
}