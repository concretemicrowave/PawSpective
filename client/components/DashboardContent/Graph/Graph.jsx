import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { GraphToggle } from "./GraphToggle";
import { GraphBar } from "./GraphBar";
import { GraphPagination } from "./GraphPagination";

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

  const currentPageData = history
    .slice(page * BARS_PER_PAGE, (page + 1) * BARS_PER_PAGE)
    .reverse();

  const values = currentPageData.map((entry) =>
    showWeight ? entry.weight : entry.score,
  );
  const maxValue = Math.max(...values, 1);
  const getScoreColor = (score) => {
    if (typeof score !== "number") return "gray";
    if (score >= 8) return "#17C964";
    if (score >= 5) return "#E9D502";
    return "#d03533";
  };

  return (
    <>
      <GraphToggle isWeight={showWeight} setIsWeight={setShowWeight} />
      <View style={styles.wrapper}>
        <View style={styles.chart}>
          {currentPageData.map((entry, index) => (
            <GraphBar
              key={index}
              entry={entry}
              isWeight={showWeight}
              maxValue={maxValue}
              barWidth={BAR_WIDTH}
              color={showWeight ? "black" : getScoreColor(entry.score)}
              showSpacing={index < BARS_PER_PAGE - 1}
            />
          ))}
        </View>
        {totalPages > 1 && (
          <GraphPagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
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
});
