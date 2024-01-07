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
import useBucket, { type FileWithURL } from "../../utils/hooks/bucket";
import Logout from "../Logout";
import { deleteImage } from "../../utils/functions/storage";
import Loader from "../../components/Loader";
import { downloadPicture } from "../../utils/functions/fileSystem";

const Pictures = () => {
  const { files, loading, fetchImages } = useBucket();

  const onDelete = async (file: FileWithURL) => {
    await deleteImage(file);
    await fetchImages();
  };

  const openPictureMenu = (file: FileWithURL) => {
    Alert.alert(file.name, "¿Qué quieres hacer con esta foto?", [
      { text: 'Cancelar', onPress: () => null },
      { text: "Descargar", onPress: () => downloadPicture(file) },
      { text: "Borrar", onPress: () => onDelete(file) },
    ]);
  };

  return (
    <Loader isLoading={loading}>
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
                <TouchableOpacity
                  style={styles.pictureContainer}
                  onLongPress={() => openPictureMenu(item)}
                >
                  <Text>{name}</Text>
                  <Image source={{ uri: url }} style={styles.image} />
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
    </Loader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
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
    marginVertical: 10,
  },
  image: {
    height: 200,
    width: 350,
    borderRadius: 5,
  },
});

export default Pictures;
