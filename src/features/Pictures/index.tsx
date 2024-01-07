import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  type StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from "react-native";
import useBucket, { type FileWithURL } from "../../utils/hooks/bucket";
import { deleteImage } from "../../utils/functions/storage";
import Loader from "../../components/Loader";
import { downloadPicture } from "../../utils/functions/fileSystem";
import useArrayState from "../../utils/hooks/arrayState";
import Footer from "./Footer";
import PictureItem from "./PictureItem";

const Pictures = () => {
  const { files, loading, fetchImages } = useBucket();

  const [selectedPictures, { addItem, removeItem }] =
    useArrayState<FileWithURL>([]);
  const selectionMode = !!selectedPictures.length;

  const onDelete = async (file: FileWithURL) => {
    await deleteImage(file);
    await fetchImages();
  };

  const openPictureMenu = (file: FileWithURL) => {
    Alert.alert(file.name, "¿Qué quieres hacer con esta foto?", [
      { text: "Cancelar", onPress: () => null },
      { text: "Descargar", onPress: () => downloadPicture(file) },
      { text: "Borrar", onPress: () => onDelete(file) },
    ]);
  };

  const togglePicture = (item: FileWithURL, index: number) => {
    if (index >= 0) {
      removeItem(index);
    } else {
      addItem(item);
    }
  };

  const onPress = (item: FileWithURL, index: number) => {
    if (selectionMode) {
      togglePicture(item, index);
    }
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
              const { id } = item;

              const selectedIndex = selectedPictures.findIndex(
                (s) => s.id === id
              );
              const isSelected = selectedIndex >= 0;

              const onLongPress = isSelected
                ? () => removeItem(selectedIndex)
                : () => addItem(item);

              return (
                <PictureItem
                  item={item}
                  onPress={() => onPress(item, selectedIndex)}
                  onLongPress={onLongPress}
                  isSelected={isSelected}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>

        <Footer selectedItems={selectedPictures} />
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
