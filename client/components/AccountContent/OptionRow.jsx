import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedComponents";

export default function OptionRow({
  label,
  onPress,
  attention = false,
  noBorder = false,
}) {
  return (
    <TouchableOpacity
      style={[styles.option, noBorder && { borderBottomWidth: 0 }]}
      onPress={onPress}
    >
      <ThemedText
        style={styles.optionText}
        color={attention ? "attention" : undefined}
      >
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  optionText: {
    fontSize: 16,
  },
});
