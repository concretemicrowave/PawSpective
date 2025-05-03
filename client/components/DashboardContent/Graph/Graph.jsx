import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { format, parseISO } from "date-fns";
import { GraphToggle } from "./GraphToggle";
import { ThemedText } from "../../ThemedComponents";

const screenWidth = Dimensions.get("window").width;
const CHART_WIDTH = screenWidth - 80;
const BAR_SPACING = 10;
const BARS_PER_PAGE = 7;
const MAX_BAR_HEIGHT = 150;
const BAR_WIDTH =
  (CHART_WIDTH - BAR_SPACING * (BARS_PER_PAGE - 1)) / BARS_PER_PAGE;

export function Graph({ history }) {
  const [showWeight, setShowWeight] = useState(true);
  const [page, setPage] = useState(0);

  if (!history || history.length === 0) return null;

  const totalPages = Math.ceil(history.length / BARS_PER_PAGE);

  const currentPageData = history.slice(
    page * BARS_PER_PAGE,
    (page + 1) * BARS_PER_PAGE,
  );

  const values = currentPageData.map((entry) =>
    showWeight ? entry.weight : entry.score,
  );
  const maxValue = Math.max(...values, 1);

  return (
    <>
      <GraphToggle isWeight={showWeight} setIsWeight={setShowWeight} />
      <View style={styles.wrapper}>
        <View style={styles.chart}>
          {currentPageData.map((entry, index) => {
            const value = showWeight ? entry.weight : entry.score;
            const height = (value / maxValue) * MAX_BAR_HEIGHT;
            const color = showWeight ? "black" : "#17C964";
            const dateLabel = format(parseISO(entry.timestamp), "MMM d");

            return (
              <View
                key={index}
                style={[
                  styles.barContainer,
                  { marginRight: index < BARS_PER_PAGE - 1 ? BAR_SPACING : 0 },
                ]}
              >
                <Text style={[styles.barLabel, { color }]}>
                  {value}
                  {showWeight ? "kg" : ""}
                </Text>
                <View
                  style={{
                    width: BAR_WIDTH,
                    height,
                    backgroundColor: color,
                    borderRadius: 8,
                  }}
                />
                <ThemedText type="subtitle" style={styles.dateLabel}>
                  {dateLabel}
                </ThemedText>
              </View>
            );
          })}
        </View>
        {totalPages > 1 && (
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
              style={[
                styles.navButton,
                page === totalPages - 1 && styles.disabled,
              ]}
            >
              <Text style={styles.navText}>→</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    paddingTop: 22,
    paddingBottom: 18,
    transform: [{ translateY: -16 }],
    overflow: "hidden",
  },
  chart: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    width: CHART_WIDTH,
    height: MAX_BAR_HEIGHT + 40,
    paddingHorizontal: 0,
  },
  barContainer: {
    alignItems: "center",
  },
  barLabel: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Poppins-Regular",
  },
  dateLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
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
