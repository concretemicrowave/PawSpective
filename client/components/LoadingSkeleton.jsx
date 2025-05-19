import { View, StyleSheet } from "react-native";
import ShimmerPlaceholder from "./Shimmer";

export default function LoadingSkeleton() {
  return (
    <View style={styles.container}>
      <ShimmerPlaceholder style={styles.lineMediumTitle} />
      <ShimmerPlaceholder style={styles.headerPlaceholder} />
      <View style={styles.card}>
        <ShimmerPlaceholder style={styles.lineShort} />
        <ShimmerPlaceholder style={styles.lineMedium} />
        <ShimmerPlaceholder style={styles.lineShort} />
        <ShimmerPlaceholder style={styles.lineLong} />
        <ShimmerPlaceholder style={styles.lineShort} />
      </View>
      <ShimmerPlaceholder style={styles.saveButtonPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  lineMediumTitle: {
    width: "60%",
    height: 30,
    borderRadius: 6,
    marginBottom: 16,
    alignSelf: "center",
  },
  headerPlaceholder: {
    height: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    backgroundColor: "#e9e9e9",
  },
  lineShort: {
    height: 16,
    width: "40%",
    borderRadius: 4,
    marginBottom: 10,
  },
  lineMedium: {
    height: 16,
    width: "60%",
    borderRadius: 4,
    marginBottom: 10,
  },
  lineLong: {
    height: 16,
    width: "80%",
    borderRadius: 4,
    marginBottom: 10,
  },
  saveButtonPlaceholder: {
    height: 48,
    borderRadius: 12,
    marginTop: 10,
  },
});
