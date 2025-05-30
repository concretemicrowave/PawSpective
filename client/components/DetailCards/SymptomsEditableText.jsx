import { useEffect, useRef } from "react";
import { TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedComponents";
import { Feather } from "@expo/vector-icons";

export default function SymptomsEditableText({
  text,
  isEditing,
  onChangeText,
  onEditPress,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      setTimeout(() => {
        inputRef.current.setNativeProps({
          selection: { start: 0, end: text.length },
        });
      }, 0);
    }
  }, [isEditing]);

  const handleBlur = () => {
    if (text !== text.trim()) {
      onChangeText(text.trim());
    }
    onEditPress?.();
  };

  return (
    <>
      {isEditing ? (
        <TextInput
          ref={inputRef}
          value={text}
          onChangeText={onChangeText}
          onBlur={handleBlur}
          style={styles.editableInput}
          multiline
        />
      ) : (
        <ThemedText
          numberOfLines={2}
          ellipsizeMode="tail"
          type="title"
          style={styles.bold}
        >
          {text}
        </ThemedText>
      )}
      <TouchableOpacity style={styles.editIcon} onPress={onEditPress}>
        <Feather name="edit-3" size={24} color="#333" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  editableInput: {
    fontFamily: "MontserratBold",
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 24,
    padding: 0,
  },
  editIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
});
