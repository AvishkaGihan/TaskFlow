import React from "react";
import { View, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { FilterType } from "../../types/task.types";
import { COLORS } from "../../constants/colors";

interface FilterTabsProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  filter,
  onFilterChange,
}) => {
  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={filter}
        onValueChange={(value) => onFilterChange(value as FilterType)}
        buttons={[
          {
            value: "all",
            label: "All",
            style: styles.button,
          },
          {
            value: "pending",
            label: "Pending",
            style: styles.button,
          },
          {
            value: "in-progress",
            label: "In Progress",
            style: styles.button,
          },
          {
            value: "completed",
            label: "Completed",
            style: styles.button,
          },
        ]}
        style={styles.segmentedButtons}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.surface,
  },
  segmentedButtons: {
    borderRadius: 8,
  },
  button: {
    borderRadius: 6,
  },
});
