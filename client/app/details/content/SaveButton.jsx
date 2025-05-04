import { ThemedButton } from "../../../components/ThemedComponents";

export default function SaveButton({ breed, update, onPress }) {
  if (!breed) return null;
  return (
    <ThemedButton
      style={styles.button}
      title={update ? "Update" : "Save"}
      borderRadius={50}
      onPress={onPress}
    />
  );
}

const styles = {
  button: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
};
