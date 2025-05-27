import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export function GraphPagination({ page, totalPages, setPage }) {
  return (
    <View style={styles.pagination}>
      <TouchableOpacity
        onPress={() => setPage((p) => Math.max(p - 1, 0))}
        disabled={page === 0}
        style={[styles.navButton, page === 0 && styles.disabled]}
      >
        <Text style={styles.navText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.pageText}>
        Page {page + 1} / {totalPages}
      </Text>
      <TouchableOpacity
        onPress={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
        disabled={page === totalPages - 1}
        style={[styles.navButton, page === totalPages - 1 && styles.disabled]}
      >
        <Text style={styles.navText}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  navText: {
    fontSize: 20,
    fontWeight: "600",
  },
  pageText: {
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 10,
  },
  disabled: {
    opacity: 0.3,
  },
});
