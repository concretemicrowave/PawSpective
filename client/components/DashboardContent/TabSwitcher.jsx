import React from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedComponents";

export default function TabSwitcher({
  selectedTab,
  onTabSwitch,
  tabIndicatorAnim,
  tabWidth,
}) {
  return (
    <View style={styles.tabWrapper}>
      <View style={styles.tabContainer}>
        <Animated.View
          style={[
            styles.highlight,
            {
              width: tabWidth,
              transform: [{ translateX: tabIndicatorAnim }],
            },
          ]}
        />
        {["Stats", "Progress"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tabButton}
            onPress={() => onTabSwitch(tab)}
          >
            <ThemedText
              style={
                selectedTab === tab ? styles.tabTextActive : styles.tabText
              }
            >
              {tab}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabWrapper: {
    alignItems: "center",
    marginBottom: 8,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    width: "90%",
    position: "relative",
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#f0f0f0",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  tabText: {
    fontSize: 16,
    opacity: 0.6,
  },
  tabTextActive: {
    fontSize: 16,
    opacity: 1,
  },
  highlight: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#ddd",
    borderRadius: 8,
    top: 0,
    left: 0,
    zIndex: 0,
  },
});
