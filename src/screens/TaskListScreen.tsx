import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import { useTaskStore } from "../store/taskStore";
import { TaskCard } from "../components/common/TaskCard";
import { FilterTabs } from "../components/common/FilterTabs";
import { EmptyState } from "../components/common/EmptyState";
import { AppHeader } from "../components/layout/AppHeader";
import { COLORS } from "../constants/colors";

interface TaskListScreenProps {
  navigation: any;
}

export const TaskListScreen: React.FC<TaskListScreenProps> = ({
  navigation,
}) => {
  const { tasks, filter, stats, actions } = useTaskStore();
  const filteredTasks = actions.getFilteredTasks();

  const handleAddTask = () => {
    navigation.navigate("AddTask");
  };

  const handleStatusChange = (id: string, status: any) => {
    actions.updateTaskStatus(id, status);
  };

  const handleDeleteTask = (id: string) => {
    actions.deleteTask(id);
  };

  return (
    <View style={styles.container}>
      <AppHeader title="TaskFlow" stats={stats} onAddTask={handleAddTask} />

      <FilterTabs filter={filter} onFilterChange={actions.setFilter} />

      {filteredTasks.length === 0 ? (
        <EmptyState onAddTask={handleAddTask} />
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteTask}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <FAB icon="plus" style={styles.fab} onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingBottom: 80,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
  },
});
