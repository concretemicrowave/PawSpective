import { SafeAreaView, View, StyleSheet } from "react-native";
import ShimmerPlaceholder from "../Shimmer";

export default function LoadingSkeleton() {
  return (
    <SafeAreaView style={styles.container}>
      <ShimmerPlaceholder style={styles.lineMediumTitle} />
      <ShimmerPlaceholder style={styles.headerPlaceholder} />
      <View style={styles.card}>
        <View style={styles.cardInside} />
      </View>
      <View style={styles.card}>
        <ShimmerPlaceholder style={styles.lineShort} />
        <ShimmerPlaceholder style={styles.lineMedium} />
        <ShimmerPlaceholder style={styles.lineShort} />
        <ShimmerPlaceholder style={styles.lineLong} />
        <ShimmerPlaceholder style={styles.lineShort} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignSelf: "flex-start",
  },
  lineMediumTitle: {
    width: "60%",
    height: 40,
    borderRadius: 8,
    marginBottom: 16,
    marginLeft: 20,
    marginTop: 20,
  },
  headerPlaceholder: {
    height: 30,
    borderRadius: 8,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    backgroundColor: "#e9e9e9",
    marginHorizontal: 20,
  },
  cardInside: {
    borderRadius: 12,
    padding: 20,
    height: 300,
    backgroundColor: "#f9f9f9",
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
});
