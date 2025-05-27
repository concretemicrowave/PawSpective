import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedComponents";
import { ProgressBar } from "../ProgressBar";

export default function NonSymptomsContent({
  text,
  progress,
  average,
  showProgress,
  type,
}) {
  return (
    <>
      <ThemedText
        numberOfLines={2}
        ellipsizeMode="tail"
        type="title"
        style={styles.bold}
      >
        {text}
      </ThemedText>
      {showProgress && (
        <ProgressBar progress={progress} average={average} type={type} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
    marginBottom: 20,
  },
});
