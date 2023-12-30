import { FC, PropsWithChildren } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface LoaderProps {
  isLoading: boolean;
}

const Loader: FC<PropsWithChildren<LoaderProps>> = ({
  isLoading,
  children,
}) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
