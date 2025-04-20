import { PanResponder, Animated } from "react-native";

export const createPanResponder = (translateY, height, setClosed) =>
  PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dy) > 5,
    onPanResponderMove: (_, gestureState) => {
      translateY.setValue(Math.min(height, Math.max(gestureState.dy, 0)));
    },
    onPanResponderRelease: (_, gestureState) => {
      const shouldClose = gestureState.dy > height / 4 || gestureState.vy > 1.5;

      Animated.timing(translateY, {
        toValue: shouldClose ? height : 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        if (shouldClose) setClosed(true);
      });
    },
  });
