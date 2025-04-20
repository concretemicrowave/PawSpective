import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Easing,
  View,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { ThemedView, ThemedText } from "@/components/ThemedComponents";
import { createPanResponder } from "../utils/panResponder";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export function Drawer({
  children,
  title,
  height,
  closed,
  setClosed,
  header = true,
}) {
  const drawerHeight = height ?? SCREEN_HEIGHT - 135;
  const translateY = useRef(new Animated.Value(drawerHeight)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: !closed ? 0 : drawerHeight,
      duration: 290,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();
  }, [closed, drawerHeight]);

  const panResponder = useRef(
    createPanResponder(translateY, drawerHeight, setClosed),
  ).current;

  if (closed) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { height: drawerHeight, transform: [{ translateY }] },
      ]}
    >
      <SafeAreaView style={styles.safeArea}>
        <ThemedView
          color="backgroundGrey"
          style={styles.content}
          {...panResponder.panHandlers}
        >
          <View style={styles.drag} />
          {header && (
            <ThemedView color="backgroundGrey" style={styles.header}>
              <ThemedText type="title" style={styles.title}>
                {title}
              </ThemedText>
            </ThemedView>
          )}
          {children}
        </ThemedView>
      </SafeAreaView>
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
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    borderRadius: 20,
    borderEndEndRadius: 0,
    borderEndStartRadius: 0,
    overflow: "hidden",
  },
  header: {
    flexDirection: "column",
    width: "100%",
    paddingTop: 16,
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
    position: "absolute",
    top: 8,
    zIndex: 10000,
  },
  title: {
    fontSize: 20,
  },
});
