import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Login from "./src/features/Login";
import useSession from "./src/utils/hooks/session";
import Pictures from "./src/features/Pictures";

export default function App() {
  const { session } = useSession();

  const Screen = session ? Pictures : Login;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Screen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
