import { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SCREEN_WIDTH = Dimensions.get("window").width;
const shimmerWidth = SCREEN_WIDTH * 1.5;

export default function ShimmerPlaceholder({ style }) {
  const translateX = useRef(new Animated.Value(-shimmerWidth)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: SCREEN_WIDTH,
        duration: 1600,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  return (
    <View style={[styles.shimmerContainer, style]}>
      <Animated.View
        style={[
          styles.animatedShimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.4)", "transparent"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  shimmerContainer: {
    backgroundColor: "#ddd",
    overflow: "hidden",
    borderRadius: 6,
  },
  animatedShimmer: {
    ...StyleSheet.absoluteFillObject,
    width: shimmerWidth,
  },
  gradient: {
    width: 500,
    height: "100%",
  },
});
