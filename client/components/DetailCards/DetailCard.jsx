import { StyleSheet } from "react-native";
import { ThemedView, ThemedText } from "../ThemedComponents";
import { ProgressBar } from "../ProgressBar";
import SymptomsEditableText from "./SymptomsEditableText";
import NonSymptomsContent from "./NonSymptomsContent";

export function DetailCard({
  title,
  bold,
  progress,
  average,
  style,
  editable,
  onChangeText,
  onEditPress,
  isEditing,
}) {
  const isSymptoms = title === "Symptoms";
  const isEditableSymptoms =
    isSymptoms && editable && typeof onChangeText === "function";

  return (
    <ThemedView style={[styles.card, style]}>
      <ThemedText style={styles.cardTitle}>{title}</ThemedText>
      {isEditableSymptoms ? (
        <SymptomsEditableText
          text={bold}
          isEditing={isEditing}
          onChangeText={onChangeText}
          onEditPress={onEditPress}
        />
      ) : (
        <NonSymptomsContent
          text={bold}
          progress={progress}
          average={average}
          showProgress={!isSymptoms}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 16,
    padding: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    backgroundColor: "transparent",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    opacity: 0.6,
    marginBottom: 4,
  },
});
