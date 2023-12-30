import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import useBucket from "../../utils/hooks/bucket";
import Logout from "../Logout";

const Pictures = () => {
  const files = useBucket();

  return (
    <View style={styles.container}>
      <Text>Holaaa pictures</Text>

      <View style={styles.picturesContainer}>
        <FlatList
          data={files}
          renderItem={({ item }) => {
            const { name, url } = item;

            return (
              <View>
                <Text>{name}</Text>
                <Image
                  source={{ uri: url }}
                  style={{ height: 200, width: 350 }}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.logoutContainer}>
        <Logout />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  picturesContainer: {
    paddingVertical: 10
  },
  logoutContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Pictures;
