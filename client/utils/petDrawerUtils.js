import { Alert } from "react-native";
import * as Haptics from "expo-haptics";
import * as Updates from "expo-updates";
import { Animated, Easing } from "react-native";
import { deletePost as deletePostFromAuth } from "../hooks/useAuth";

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

export const handleDeleteWithReload = async (postId) => {
  await deletePostFromAuth(postId);
  await Updates.reloadAsync();
};

export const confirmDelete = (postId, onConfirm) => {
  Alert.alert("Confirm Deletion", "Are you sure you want to delete this?", [
    { text: "Cancel", style: "cancel" },
    { text: "Delete", style: "destructive", onPress: onConfirm },
  ]);
};
