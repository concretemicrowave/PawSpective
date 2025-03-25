import { useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import { ThemedText } from "./ThemedComponents";
import { Colors } from "../constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { hexToRgba } from "@/utils/hexToRgba";

export function Note({ title, open, setOpen, duration = 1500 }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const theme = useColorScheme();
  const backgroundColor = hexToRgba(Colors[theme].backgroundGrey, 0.8);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: open ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }).start();
        setOpen(false);
      }, duration);
    });
  }, [open]);

  return (
    <Animated.View
      style={[styles.container, { opacity: fadeAnim, backgroundColor }]}
    >
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
