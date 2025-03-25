import { TextInput, StyleSheet } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";

export function ThemedInput({
  style,
  placeholder,
  lightColor,
  darkColor,
  value,
  height = "50",
  borderRadius = 12,
  onChangeText,
  type = "default",
  editable = true,
  required = false,
  ...rest
}) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const isDisabled = type === "disabled" || !editable;
  const isReadOnly = type === "read-only";

  const modifiedPlaceholder = required ? `${placeholder} *` : placeholder;

  return (
    <TextInput
      style={[
        styles.input,
        { color },
        { borderRadius },
        isDisabled && styles.disabled,
        isReadOnly && styles.readOnly,
        (height = { height }),
        style,
      ]}
      value={value}
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
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginBottom: 10,
    minWidth: 200,
    fontSize: 16,
    fontFamily: "Montserrat",
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: "rgba(200, 200, 200, 0.1)",
  },
  readOnly: {
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
  },
});
