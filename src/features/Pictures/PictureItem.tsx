import type { FC } from "react";
import type { FileWithURL } from "../../utils/hooks/bucket";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { getDate, getTime } from "../../utils/functions/dates";

export interface PictureItemProps {
  item: FileWithURL;
  onLongPress: () => void;
  onPress: () => void;
  isSelected: boolean;
}

const PictureItem: FC<PictureItemProps> = ({
  item,
  isSelected,
  onLongPress,
  onPress,
}) => {
  const { url, created_at } = item;

  const date = getDate(created_at);
  const time = getTime(created_at);

  const itemStyles: StyleProp<ViewStyle>[] = [styles.pictureContainer];

  if (isSelected) {
    itemStyles.push(styles.selected);
  }

  return (
    <TouchableOpacity
      style={StyleSheet.flatten(itemStyles)}
      onLongPress={onLongPress}
      onPress={onPress}
    >
      <Text style={styles.name}>{`${date} - ${time}`}</Text>
      <Image source={{ uri: url }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pictureContainer: {
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 5,
  },
  name: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  image: {
    height: 200,
    width: 350,
    borderRadius: 5,
  },
  selected: {
    backgroundColor: "lightgreen",
  },
});

export default PictureItem;
