import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";

export async function getAllByPage(page) {
  const request = await api.get("/character", {
    params: {
      page
    }
  });

  return Promise.all(request.data.results.map(async result => ({ 
    isFavorite: await _checkIfFavorite(result.id), 
    ...result
  })));
}

export async function getById(id) {
  const request = await api.get(`/character/${id}`);

  return {
    isFavorite: await _checkIfFavorite(request.data.id), 
    ...request.data
  };
}

export async function getMultipleById(ids) {
  const request = await api.get(`/character/${ids.join(",")}`);

  if (!Array.isArray(request.data)) {
    request.data = [ request.data ];
  }

  return Promise.all(request.data.map(async result => ({ 
    isFavorite: await _checkIfFavorite(result.id), 
    ...result
  })));
}

export async function getAllFavorites() {
  const favoriteIds = await _getAllFavoritesIds();

  return await getMultipleById(favoriteIds);
}

export async function addAsFavorite(id) {
  const favorites = await _getAllFavoritesIds();
  favorites.push(id);
  _setFavorites(favorites);
}

export async function removeAsFavorite(id) {
  const favorites = await _getAllFavoritesIds();
  const itemToRemoveIndex = favorites.indexOf(id);
  favorites.splice(itemToRemoveIndex, 1);
  _setFavorites(favorites);
}

async function _checkIfFavorite(id) {
  const favorites = await _getAllFavoritesIds();
  return favorites.includes(id);
}

function _setFavorites(favoriteIds) {
  const json = JSON.stringify(favoriteIds);
  return AsyncStorage.setItem("favorites", json);
}

async function _getAllFavoritesIds() {
  const favoriteIds = JSON.parse(await AsyncStorage.getItem("favorites") ?? "[]") || [];
  return favoriteIds;
}