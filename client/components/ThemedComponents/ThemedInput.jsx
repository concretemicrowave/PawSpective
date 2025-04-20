import { TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export function ThemedInput({
  style,
  placeholder,
  value,
  height = "50",
  borderRadius = 12,
  bordered = true,
  onChangeText,
  type = "default",
  editable = true,
  required = false,
  disabled = false,
  ...rest
}) {
  const color = Colors["light"].text;
  const isDisabled = type === "disabled" || !editable || disabled;
  const isReadOnly = type === "read-only";

  const modifiedPlaceholder = required ? `${placeholder} *` : placeholder;

  return (
    <TextInput
      style={[
        styles.input,
        { borderRadius },
        isDisabled && styles.disabled,
        isReadOnly && styles.readOnly,
        bordered ? {} : { borderWidth: 0 },
        (height = { height }),
        style,
      ]}
      value={value}
      placeholderTextColor={color}
      onChangeText={onChangeText}
      placeholder={modifiedPlaceholder}
      editable={!isDisabled && !isReadOnly}
      selectTextOnFocus={!isDisabled}
      pointerEvents={isDisabled ? "none" : "auto"}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginBottom: 10,
    fontSize: 16,
    fontFamily: "Montserrat",
    color: "#000000",
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: "rgba(200, 200, 200, 0.2)",
  },
  readOnly: {
    backgroundColor: "transparent",
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 2,
  },
});
