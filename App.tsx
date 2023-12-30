import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import Login from "./src/features/Login";
import useSession from "./src/utils/hooks/session";
import Pictures from "./src/features/Pictures";

export default function App() {
  const { session } = useSession();

  const Screen = session ? Pictures : Login;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Screen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
