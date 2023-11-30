import { List } from "react-native-paper";

export default function Episodio({ name, ...props }) {
  return (
    <List.Item title={name} left={props => <List.Icon icon="play-box" {...props} />} {...props} />
  );
}