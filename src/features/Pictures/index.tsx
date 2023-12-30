import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useBucket from "../../utils/hooks/bucket";
import Logout from "../Logout";

const Pictures = () => {
  const files = useBucket();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Fotillos</Text>
      </View>

      <View style={styles.picturesContainer}>
        <FlatList
          data={files}
          renderItem={({ item }) => {
            const { name, url } = item;

            return (
              <View style={styles.pictureContainer}>
                <Text>{name}</Text>
                <Image
                  source={{ uri: url }}
                  style={{ height: 200, width: 350, borderRadius: 5 }}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    padding: 10,
    marginTop: 20
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  picturesContainer: {
    paddingVertical: 10,
    flex: 1,
  },
  logoutContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  pictureContainer: {
    marginVertical: 10
  }
});

export default Pictures;
