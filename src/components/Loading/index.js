import { ActivityIndicator } from "react-native-paper";

export default function Loading({ ...props }) {
  return <ActivityIndicator animating size="large" color="#0000ff" {...props} />;
}