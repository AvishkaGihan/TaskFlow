import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Appbar,
  TextInput,
  Button,
  SegmentedButtons,
  Chip,
} from "react-native-paper";
import { useTaskStore } from "../store/taskStore";
import { TaskPriority } from "../types/task.types";
import { COLORS } from "../constants/colors";

interface AddTaskScreenProps {
  navigation: any;
}

export const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ navigation }) => {
  const { actions } = useTaskStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState<string>("");

  const handleSave = () => {
    if (title.trim()) {
      actions.addTask(
        title.trim(),
        description.trim() || undefined,
        priority,
        dueDate ? new Date(dueDate) : undefined
      );
      navigation.goBack();
    }
  };

  const isFormValid = title.trim().length > 0;

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add New Task" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <TextInput
          label="Task Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          mode="outlined"
          placeholder="What needs to be done?"
        />

        <TextInput
          label="Description (Optional)"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          mode="outlined"
          multiline
          numberOfLines={3}
          placeholder="Add more details about this task..."
        />

        <View style={styles.section}>
          <Chip mode="outlined" style={styles.sectionLabel}>
            Priority
          </Chip>
          <SegmentedButtons
            value={priority}
            onValueChange={(value) => setPriority(value as TaskPriority)}
            buttons={[
              {
                value: "low",
                label: "Low",
                style: styles.priorityButton,
              },
              {
                value: "medium",
                label: "Medium",
                style: styles.priorityButton,
              },
              {
                value: "high",
                label: "High",
                style: styles.priorityButton,
              },
            ]}
            style={styles.segmentedButtons}
          />
        </View>

        <TextInput
          label="Due Date (Optional)"
          value={dueDate}
          onChangeText={setDueDate}
          style={styles.input}
          mode="outlined"
          placeholder="YYYY-MM-DD"
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleSave}
          disabled={!isFormValid}
          style={styles.saveButton}
          icon="check"
        >
          Save Task
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  segmentedButtons: {
    borderRadius: 8,
  },
  priorityButton: {
    borderRadius: 6,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  saveButton: {
    borderRadius: 8,
  },
});
