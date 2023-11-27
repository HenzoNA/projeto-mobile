import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import styles from "./styles";
import FavoriteButton from '../FavoriteButton';
import { addAsFavorite, removeAsFavorite } from '../../services/PersonagemService';


export default function Personagem({ id, name, gender, status, image, isFavorite, ...props }) {
  
  function handleFavorite(isFavorite) {
    if (isFavorite) {
      removeAsFavorite(id);
    } else {
      addAsFavorite(id);
    }
  }

  return (
    <Card style={styles.cardContainer} {...props} >
      
      <Card.Cover source={{ uri: image }} style={styles.image} />
      <Card.Title 
        style={styles.title} 
        title={name} 
        right={() => <FavoriteButton isFavorite={isFavorite} onPress={handleFavorite} />} 
      />
      <Card.Content>
        <Paragraph style={styles.text}>{gender}</Paragraph>
        <Paragraph style={styles.text}>{status}</Paragraph>
      </Card.Content>
    </Card>
  );
}