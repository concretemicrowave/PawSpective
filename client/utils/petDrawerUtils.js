import { Alert } from "react-native";
import * as Haptics from "expo-haptics";
import * as Updates from "expo-updates";
import { Animated, Easing } from "react-native";

export const animateDrawerIn = (animRef, toValue) =>
  Animated.timing(animRef, {
    toValue,
    duration: 250,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  });

export const animateDrawerOut = (animRef, toValue) =>
  Animated.timing(animRef, {
    toValue,
    duration: 200,
    easing: Easing.in(Easing.cubic),
    useNativeDriver: true,
  });

export const triggerHaptic = async () => {
  await Haptics.impactAsync();
};
