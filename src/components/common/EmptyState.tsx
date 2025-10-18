import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { COLORS } from "../../constants/colors";

interface EmptyStateProps {
  onAddTask: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddTask }) => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        No Tasks Yet
      </Text>
      <Text variant="bodyMedium" style={styles.description}>
        Start organizing your work by creating your first task
      </Text>
      <Button
        mode="contained"
        onPress={onAddTask}
        style={styles.button}
        icon="plus"
      >
        Add Your First Task
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    color: COLORS.text.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    color: COLORS.text.secondary,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    borderRadius: 8,
  },
});
