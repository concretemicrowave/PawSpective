import { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { GraphToggle } from "./GraphToggle";
import { GraphBar } from "./GraphBar";
import { GraphPagination } from "./GraphPagination";

const screenWidth = Dimensions.get("window").width;
const CHART_WIDTH = screenWidth - 80;
const BAR_SPACING = 8;
const BARS_PER_PAGE = 6;
const MAX_BAR_HEIGHT = 150;
const BAR_WIDTH =
  (CHART_WIDTH - BAR_SPACING * (BARS_PER_PAGE - 1)) / BARS_PER_PAGE - 6;

export function Graph({ history }) {
  const [showWeight, setShowWeight] = useState(true);
  const [page, setPage] = useState(Math.floor(history.length / 6));

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
      <View style={styles.wrapper}>
        <GraphToggle isWeight={showWeight} setIsWeight={setShowWeight} />
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
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingTop: 8,
    paddingBottom: 18,
    overflow: "hidden",
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: CHART_WIDTH,
    height: MAX_BAR_HEIGHT + 40,
    transform: [{ translateX: 2 }],
    paddingHorizontal: 0,
  },
});
