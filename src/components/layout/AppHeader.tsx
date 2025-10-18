import React from "react";
import { Appbar } from "react-native-paper";
import { TaskStats } from "../../types/task.types";

interface AppHeaderProps {
  title: string;
  stats: TaskStats;
  onAddTask: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  stats,
  onAddTask,
}) => {
  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
      <Appbar.Action icon="chart-box" />
      <Appbar.Action icon="plus" onPress={onAddTask} animated={false} />
    </Appbar.Header>
  );
};
