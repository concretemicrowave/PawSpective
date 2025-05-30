import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedComponents";
import DashboardContent from "./DashboardContent";

export default function DashboardMainContent({
  petData,
  latestEntry,
  id,
  setUpdate,
}) {
  return (
    <View style={styles.content}>
      {!petData || !latestEntry ? (
        <ThemedText style={styles.emptyText}>Scan a pet!</ThemedText>
      ) : (
        <DashboardContent
          latestEntry={latestEntry}
          id={id}
          setUpdate={setUpdate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    width: "90%",
    padding: 12,
    paddingBottom: 0,
    marginHorizontal: 20,
    minHeight: 350,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.8,
  },
});
