import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { ThemedText, ThemedView } from "../ThemedComponents";

const MAX_DRAWER_HEIGHT = Dimensions.get("window").height * 0.6;

export default function SwitchPetDrawer({
  visible,
  setVisible,
  pets,
  setSelectedTab,
}) {
  const [internalVisible, setInternalVisible] = useState(visible);
  const translateY = useRef(new Animated.Value(MAX_DRAWER_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      setInternalVisible(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: MAX_DRAWER_HEIGHT,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        setInternalVisible(false);
      });
    }
  }, [visible]);

  if (!internalVisible) return null;

  return (
    <Modal visible={internalVisible} transparent animationType="none">
      <View style={styles.overlay}>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)} />
      </View>
      <Animated.View
        style={[
          styles.drawer,
          {
            minHeight: 250,
            maxHeight: MAX_DRAWER_HEIGHT,
            transform: [{ translateY }],
          },
        ]}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedText type="subtitle" style={styles.title}>
            Switch Pets
          </ThemedText>
          <ThemedView style={styles.petList}>
            {Object.entries(pets).map(([postId, pet], index, array) => {
              const isLast = index === array.length - 1;
              return (
                <TouchableOpacity
                  key={postId}
                  style={[styles.petOption, isLast && { borderBottomWidth: 0 }]}
                  onPress={() => {
                    setSelectedTab(index);
                    setVisible(false);
                  }}
                >
                  <ThemedText style={styles.petName}>{pet.name}</ThemedText>
                </TouchableOpacity>
              );
            })}
          </ThemedView>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.25)",
    zIndex: 1,
  },
  drawer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#e6e6e6",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 3,
    elevation: 10,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    marginBottom: 8,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  petList: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#a7a7a7",
    marginBottom: 10,
    backgroundColor: "#e6e6e6",
  },
  petOption: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: "#bababa",
    transform: [{ translateY: 1 }],
  },
  petName: {
    fontSize: 18,
  },
});
