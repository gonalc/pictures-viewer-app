import { FC } from "react";
import type { FileWithURL } from "../../utils/hooks/bucket";
import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

export interface PictureItemProps {
  item: FileWithURL;
  onLongPress: () => void;
  onPress: () => void;
  isSelected: boolean;
}

const PictureItem: FC<PictureItemProps> = ({ item, isSelected, onLongPress, onPress }) => {
  const { name, url } = item;

  const itemStyles: StyleProp<ViewStyle>[] = [styles.pictureContainer];

  if (isSelected) {
    itemStyles.push({ backgroundColor: "red" });
  }

  return (
    <TouchableOpacity
      style={StyleSheet.flatten(itemStyles)}
      onLongPress={onLongPress}
      onPress={onPress}
    >
      <Text>{name}</Text>
      <Image source={{ uri: url }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pictureContainer: {
    marginVertical: 10,
  },
  image: {
    height: 200,
    width: 350,
    borderRadius: 5,
  },
});

export default PictureItem;
