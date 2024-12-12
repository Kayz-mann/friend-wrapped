import { StyleSheet, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import theme, { Text } from "./Theme";

interface ListEmptyProps {
  title?: string;
  description?: string;
}

const ListEmptyCompontent = ({ title, description }: ListEmptyProps) => {
  return (
    <View style={styles.emptyStateContainer}>
      <MaterialIcons name="person-outline" size={70} color={theme.colors.bg3} />
      <Text variant="text6" color="text" style={styles.emptyStateText}>
        {title}
      </Text>
      <Text variant="text6" color="text" style={styles.emptyStateText}>
        {description}
      </Text>
    </View>
  );
};

export default ListEmptyCompontent;

const styles = StyleSheet.create({
  emptyStateContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 30,
  },
  emptyStateText: {
    fontSize: 16,
    marginTop: 10,
    color: theme.colors.text,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: theme.colors.text1,
    marginTop: 5,
  },
});
