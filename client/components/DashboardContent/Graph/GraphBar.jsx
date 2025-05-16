import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { format, parseISO } from "date-fns";
import { ThemedText } from "../../ThemedComponents";

export function GraphBar({
  entry,
  isWeight,
  maxValue,
  barWidth,
  color,
  showSpacing,
}) {
  const value = isWeight ? entry.weight : entry.score;
  const height = (value / maxValue) * 150;
  const dateLabel = format(parseISO(entry.timestamp), "MMM d");

  return (
    <View style={[styles.barContainer, { marginRight: showSpacing ? 10 : 0 }]}>
      <Text style={styles.barLabel}>
        {value}
        {isWeight ? "kg" : ""}
      </Text>
      <View
        style={{
          width: barWidth,
          height,
          backgroundColor: color,
          borderRadius: 8,
        }}
      />
      <ThemedText type="subtitle" style={styles.dateLabel}>
        {dateLabel}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    alignItems: "center",
  },
  barLabel: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
  dateLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
});
