import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  View,
  Modal,
  TouchableWithoutFeedback,
  findNodeHandle,
  UIManager,
  Dimensions,
} from "react-native";
import { ThemedText } from "./ThemedComponents";
import { useState, useRef, useEffect } from "react";

export function Dropdown({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const animation = useRef(new Animated.Value(0)).current;
  const triggerRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;

  const openDropdown = () => {
    const handle = findNodeHandle(triggerRef.current);
    if (handle) {
      UIManager.measureInWindow(handle, (x, y, width, height) => {
        setPosition({ x, y, width, height });
        setIsOpen(true);
      });
    }
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const dropdownTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  const dropdownOpacity = animation;

  const dropdownWidth = 200; // Set the dropdown width you want
  const calculatedLeft = Math.min(
    position.x + position.width - dropdownWidth,
    screenWidth - dropdownWidth - 8,
  );

  return (
    <>
      <TouchableOpacity
        ref={triggerRef}
        style={styles.dropdown}
        onPress={openDropdown}
        activeOpacity={0.6}
      >
        {typeof title === "string" ? (
          <ThemedText style={styles.title}>{title}</ThemedText>
        ) : (
          title
        )}
      </TouchableOpacity>

      <Modal transparent visible={isOpen} animationType="none">
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.contentWrapper,
                {
                  top: position.y + position.height,
                  left: calculatedLeft,
                  width: dropdownWidth,
                  opacity: dropdownOpacity,
                  transform: [{ translateY: dropdownTranslateY }],
                },
              ]}
            >
              <View style={styles.dropdownContainer}>{children}</View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 10,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  contentWrapper: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    gap: 4,
  },
});
