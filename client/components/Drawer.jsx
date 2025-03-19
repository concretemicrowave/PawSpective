import React, { useEffect, useRef } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

export function Drawer({ children, title, height, toggle }) {
  const translateY = useRef(new Animated.Value(height)).current;
  const colorScheme = useColorScheme();
  const borderColor =
    colorScheme === "dark" ? Colors.dark.border : Colors.light.border;

  console.log(borderColor);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: toggle ? 0 : height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [toggle]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        translateY.setValue(Math.min(height, Math.max(gestureState.dy, 0)));
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > height / 3) {
          Animated.timing(translateY, {
            toValue: height,
            duration: 200,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[styles.container, { height, transform: [{ translateY }] }]}
    >
      <ThemedView style={styles.content} {...panResponder.panHandlers}>
        <ThemedView style={styles.header}>
          <View style={[styles.drag, { backgroundColor: borderColor }]} />
          <ThemedText type="subtitle" style={styles.title}>
            {title}
          </ThemedText>
        </ThemedView>
        {children}
      </ThemedView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 5,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
  },
  drag: {
    width: 32,
    height: 4,
    borderRadius: 2,
    marginHorizontal: "auto",
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
