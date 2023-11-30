import { List } from "react-native-paper";

export default function Local({ name, dimension, ...props }) {
  return (
    <List.Item title={`${name}, ${dimension}`} left={props => <List.Icon icon="map-marker" {...props} />} {...props} />
  );
}