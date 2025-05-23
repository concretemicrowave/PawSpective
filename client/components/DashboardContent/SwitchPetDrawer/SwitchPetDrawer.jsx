import {
  Modal,
  Animated,
  Pressable,
  ScrollView,
  Dimensions,
  StyleSheet as RNStyleSheet,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import PetOption from "./PetOption";
import { ThemedView } from "../../ThemedComponents";
import {
  animateDrawerIn,
  animateDrawerOut,
  triggerHaptic,
} from "../../../utils/petDrawerUtils";

const MAX_DRAWER_HEIGHT = Dimensions.get("window").height * 0.6;

export default function SwitchPetDrawer({
  visible,
  setVisible,
  pets,
  selectedPostId,
  setSelectedTab,
}) {
  const [internalVisible, setInternalVisible] = useState(visible);
  const translateY = useRef(new Animated.Value(MAX_DRAWER_HEIGHT)).current;

  const overlayOpacity = translateY.interpolate({
    inputRange: [0, MAX_DRAWER_HEIGHT],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    if (visible) {
      setInternalVisible(true);
      translateY.setValue(MAX_DRAWER_HEIGHT);
      animateDrawerIn(translateY, 0).start();
      triggerHaptic();
    } else {
      animateDrawerOut(translateY, MAX_DRAWER_HEIGHT).start(() => {
        setInternalVisible(false);
      });
    }
  }, [visible]);

  if (!internalVisible) return null;

  return (
    <Modal visible={internalVisible} transparent animationType="none">
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
        <Pressable
          style={RNStyleSheet.absoluteFill}
          onPress={() => setVisible(false)}
        />
      </Animated.View>
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
          <ThemedView style={styles.petList}>
            {Object.entries(pets).map(([postId, pet], index, array) => {
              const isLast = index === array.length - 1;
              return (
                <PetOption
                  key={postId}
                  postId={postId}
                  pet={pet}
                  isLast={isLast}
                  setSelectedTab={setSelectedTab}
                  setVisible={setVisible}
                  selectedPostId={selectedPostId}
                />
              );
            })}
          </ThemedView>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

const styles = RNStyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.45)",
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
  scrollContent: {
    paddingBottom: 10,
  },
  petList: {
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.2)",
    marginBottom: 10,
    backgroundColor: "#e6e6e6",
  },
});
