import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";

export default function ImagePickerButton({ onImagePicked, disabled }) {
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
    });

    if (!result.canceled && onImagePicked) {
      const imageUri = result.assets[0].uri;
      onImagePicked(imageUri);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <TouchableOpacity
      style={styles.libraryButton}
      onPress={handlePickImage}
      disabled={disabled}
    >
      <Ionicons name="image-outline" size={30} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  libraryButton: {
    position: "absolute",
    bottom: 100,
    left: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 20,
    padding: 10,
  },
});
