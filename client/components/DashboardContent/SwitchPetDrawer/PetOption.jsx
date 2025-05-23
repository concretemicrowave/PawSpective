import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { ThemedText } from "../../ThemedComponents";
import {
  confirmDelete,
  handleDeleteWithReload,
} from "../../../utils/petDrawerUtils";

export default function PetOption({
  postId,
  pet,
  isLast,
  setVisible,
  setSelectedTab,
  selectedPostId,
}) {
  const latestImageUri = pet.history?.[pet.history.length - 1]?.uri || null;
  const isSelected = selectedPostId === postId;

  const handlePress = () => {
    Haptics.selectionAsync();
    setSelectedTab(postId);
    setVisible(false);
  };

  const handleDelete = async () => {
    await handleDeleteWithReload(postId);
  };

  const confirmAndDelete = () => {
    confirmDelete(postId, handleDelete);
  };

  return (
    <TouchableOpacity
      style={[styles.petOption, isLast && { borderBottomWidth: 0 }]}
      onPress={handlePress}
    >
      <View style={styles.row}>
        <Image
          source={{ uri: latestImageUri || "https://place-puppy.com/80x80" }}
          style={styles.avatar}
        />
        <ThemedText
          style={styles.petName}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {pet.name}
        </ThemedText>
        {isSelected && (
          <MaterialIcons
            name="check-circle"
            size={20}
            color="#4CAF50"
            style={{ marginLeft: 8 }}
          />
        )}
      </View>
      <TouchableOpacity onPress={confirmAndDelete}>
        <Feather name="trash-2" size={28} color="rgba(0,0,0,0.75)" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  petOption: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: "#bababa",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  petName: {
    fontSize: 18,
    marginLeft: 12,
    maxWidth: "65%",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ccc",
  },
});
