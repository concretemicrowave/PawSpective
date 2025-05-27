import { StyleSheet, TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";
import { useAuth } from "../../../hooks/useAuth";
import { useUser } from "@/context/UserContext";
import { useReload } from "@/context/ReloadContext";
import PetInfo from "./PetInfo";
import PetActionsDropdown from "./PetActionsDropdown";

export default function PetOption({
  postId,
  pet,
  isLast,
  setVisible,
  setSelectedTab,
  selectedPostId,
}) {
  const { deletePost } = useAuth();
  const { refetchUser } = useUser();
  const { acknowledgeReload } = useReload();

  const isSelected = selectedPostId === postId;

  const handlePress = () => {
    Haptics.selectionAsync();
    setSelectedTab(postId);
    setVisible(false);
  };

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      await refetchUser();
      setVisible(false);
      await acknowledgeReload();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete the post. Please try again.");
    }
  };

  return (
    <TouchableOpacity
      style={[styles.petOption, isLast && { borderBottomWidth: 0 }]}
      onPress={handlePress}
    >
      <PetInfo pet={pet} isSelected={isSelected} />
      <PetActionsDropdown onDelete={handleDelete} setVisible={setVisible} />
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
});
