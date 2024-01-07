import { StyleSheet, Text, View } from "react-native";
import Logout from "../Logout";
import type { FileWithURL } from "../../utils/hooks/bucket";
import { FC } from "react";

export interface FooterProps {
  selectedItems: FileWithURL[];
}

const Footer: FC<FooterProps> = ({ selectedItems }) => {
  if (!!selectedItems.length) {
    return (
      <View>
        <Text>{selectedItems.length} fotos seleccionadas</Text>
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
});

export default Footer;
