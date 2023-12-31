import { StyleSheet } from "react-native";


export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    padding: 10, // Add padding around the image
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,

  },
  episode: {
    fontSize: 14,
    fontStyle: "italic",
  },
  favorite: {
    position: "absolute",
    bottom: 30,
    right: 30,
    zIndex: 2
  }
});

