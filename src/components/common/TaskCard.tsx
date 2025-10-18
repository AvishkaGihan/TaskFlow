import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button, Chip } from "react-native-paper";
import { Task } from "../../types/task.types";
import { COLORS } from "../../constants/colors";
import { formatDate } from "../../utils/helpers";

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: Task["status"]) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onStatusChange,
  onDelete,
}) => {
  const getPriorityColor = (priority: Task["priority"]) => {
    return COLORS.priority[priority];
  };

  const getStatusActions = () => {
    switch (task.status) {
      case "pending":
        return (
          <Button
            mode="contained"
            onPress={() => onStatusChange(task.id, "in-progress")}
            style={styles.actionButton}
          >
            Start
          </Button>
        );
      case "in-progress":
        return (
          <Button
            mode="contained"
            onPress={() => onStatusChange(task.id, "completed")}
            style={styles.actionButton}
          >
            Complete
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>
            {task.title}
          </Text>
          <Chip
            mode="outlined"
            textStyle={styles.chipText}
            style={[
              styles.priorityChip,
              { borderColor: getPriorityColor(task.priority) },
            ]}
          >
            {task.priority}
          </Chip>
        </View>

        {task.description && (
          <Text variant="bodyMedium" style={styles.description}>
            {task.description}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.metaInfo}>
            <Text variant="bodySmall" style={styles.date}>
              Created: {formatDate(task.createdAt)}
            </Text>
            {task.dueDate && (
              <Text variant="bodySmall" style={styles.date}>
                Due: {formatDate(task.dueDate)}
              </Text>
            )}
          </View>

          <View style={styles.actions}>
            {getStatusActions()}
            <Button
              mode="outlined"
              onPress={() => onDelete(task.id)}
              style={styles.actionButton}
            >
              Delete
            </Button>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    marginHorizontal: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  description: {
    color: COLORS.text.secondary,
    marginBottom: 12,
  },
  priorityChip: {
    height: 24,
  },
  chipText: {
    fontSize: 12,
    textTransform: "capitalize",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  metaInfo: {
    flex: 1,
  },
  date: {
    color: COLORS.text.light,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    minWidth: 80,
  },
});
