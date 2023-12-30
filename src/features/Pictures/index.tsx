import {
    Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useBucket, { FileWithURL } from "../../utils/hooks/bucket";
import Logout from "../Logout";

const Pictures = () => {
  const files = useBucket();

  const openPictureMenu = (file: FileWithURL) => {
    console.log(JSON.stringify(file, null, 2))

    Alert.alert(file.name, '¿Qué quieres hacer con esta foto?', [
        { text: 'Descargar', onPress: () => null },
        { text: 'Borrar', onPress: () => null }
    ])
  }

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
              <TouchableOpacity style={styles.pictureContainer} onLongPress={() => openPictureMenu(item)}>
                <Text>{name}</Text>
                <Image
                  source={{ uri: url }}
                  style={styles.image}
                />
              </TouchableOpacity>
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
  },
  image: {
    height: 200,
    width: 350,
    borderRadius: 5
  }
});

export default Pictures;
