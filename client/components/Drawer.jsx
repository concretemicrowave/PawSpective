import React, { useEffect, useRef } from "react";
import { Animated, PanResponder, StyleSheet, Easing, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

export function Drawer({ children, title, height, toggle, setClosed }) {
  const translateY = useRef(new Animated.Value(height)).current;
  const colorScheme = useColorScheme();
  const borderColor =
    colorScheme === "dark" ? Colors.dark.border : Colors.light.border;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: toggle ? 0 : height,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
    setClosed(false);
  }, [toggle]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        translateY.setValue(Math.min(height, Math.max(gestureState.dy, 0)));
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > height / 8) {
          Animated.timing(translateY, {
            useNativeDriver: true,
            duration: 150,
            toValue: height,
            easing: Easing.out(Easing.ease),
          }).start();
          setClosed(true);
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }).start();
        }
      },
    }),
  ).current;

  if (!toggle) return null;

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
    fontWeight: "bold",
  },
});
