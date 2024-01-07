import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logout from "../Logout";
import type { FileWithURL } from "../../utils/hooks/bucket";
import { FC } from "react";

export interface FooterProps {
  selectedItems: FileWithURL[];
  deletePictures: () => void
}

const Footer: FC<FooterProps> = ({ selectedItems, deletePictures }) => {
  const onDeleteSelection = () => {
    Alert.alert(
      "Borrando fotos",
      `¿Estás seguro de que quieres borrar ${selectedItems.length} fotos?`,
      [
        { text: "Cancelar", onPress: () => null },
        { text: "Borrar fotos", onPress: deletePictures },
      ]
    );
  };

  if (!!selectedItems.length) {
    return (
      <View>
        <Text style={styles.selectedText}>{selectedItems.length} fotos seleccionadas</Text>

        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={onDeleteSelection} style={styles.deleteButton}>
            <Text>Borrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.logoutContainer}>
      <Logout />
    </View>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  selectedText: {
    textAlign: 'center',
    marginBottom: 10
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  deleteButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "pink",
  },
});

export default Footer;
