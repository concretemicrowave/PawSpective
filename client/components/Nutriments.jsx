import { StyleSheet } from "react-native";
import { View, ScrollView } from "react-native";
import { ThemedText } from "./ThemedComponents";
import { useThemeColor } from "../hooks/useThemeColor";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faFire,
  faDrumstickBite,
  faBreadSlice,
  faWeight,
  faCubesStacked,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

export function Nutriments({ lightColor, darkColor, nutriments }) {
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "border",
  );

  return (
    <ScrollView
      style={[
        styles.container,
        { borderColor, backgroundColor: "rgba(255, 255, 255, 0.1)" },
      ]}
      bounces={false}
    >
      <View style={styles.nutriment}>
        <FontAwesomeIcon icon={faFire} size={24} color="#FF3C00" />
        <ThemedText>
          <ThemedText type="subtitle" style={styles.boldText}>
            {nutriments.calories}
          </ThemedText>{" "}
          calories
        </ThemedText>
      </View>
      <View style={styles.nutriment}>
        <FontAwesomeIcon icon={faDrumstickBite} size={24} color="#C47222" />
        <ThemedText>
          <ThemedText type="subtitle" style={styles.boldText}>
            {nutriments.protein}
          </ThemedText>{" "}
          protein
        </ThemedText>
      </View>
      <View style={styles.nutriment}>
        <FontAwesomeIcon icon={faBreadSlice} size={24} color="#FAE5D3" />
        <ThemedText>
          <ThemedText type="subtitle" style={styles.boldText}>
            {nutriments.carbs}
          </ThemedText>{" "}
          carbs
        </ThemedText>
      </View>
      <View style={styles.nutriment}>
        <FontAwesomeIcon icon={faWeight} size={24} color="#B0B7C6" />
        <ThemedText>
          <ThemedText type="subtitle" style={styles.boldText}>
            {nutriments.fat}
          </ThemedText>{" "}
          fats({nutriments.fats_unit})
        </ThemedText>
      </View>
      <View style={styles.nutriment}>
        <FontAwesomeIcon icon={faCubesStacked} size={24} color="#fefefe" />
        <ThemedText>
          <ThemedText type="subtitle" style={styles.boldText}>
            {nutriments.sugar}
          </ThemedText>{" "}
          sugar({nutriments.sugars_unit})
        </ThemedText>
      </View>
      <View style={styles.nutriment}>
        <FontAwesomeIcon icon={faLeaf} size={24} color="#4CAF50" />
        <ThemedText>
          <ThemedText type="subtitle" style={styles.boldText}>
            {nutriments.fiber}
          </ThemedText>{" "}
          fiber({nutriments.fiber_unit})
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  nutriment: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  boldText: {
    fontSize: 16,
  },
});
