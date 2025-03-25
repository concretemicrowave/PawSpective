import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Easing, View } from "react-native";
import { ThemedView, ThemedText } from "@/components/ThemedComponents";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import { createPanResponder } from "../utils/panResponder";

export function Drawer({ children, title, height, closed, setClosed }) {
  const translateY = useRef(new Animated.Value(height)).current;
  const colorScheme = useColorScheme();
  const borderColor = Colors[colorScheme].border;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: !closed ? 0 : height,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();
  }, [closed]);

  const panResponder = useRef(
    createPanResponder(translateY, height, setClosed),
  ).current;

  if (closed) return null;

  return (
    <Animated.View
      style={[styles.container, { height, transform: [{ translateY }] }]}
    >
      <ThemedView
        color="backgroundGrey"
        style={styles.content}
        {...panResponder.panHandlers}
      >
        <ThemedView color="backgroundGrey" style={styles.header}>
          <View style={[styles.drag, { backgroundColor: borderColor }]} />
          <ThemedText type="title" style={styles.title}>
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
    paddingVertical: 16,
    borderRadius: 20,
  },
  header: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  drag: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: "gray",
    marginBottom: 4,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
  },
});
