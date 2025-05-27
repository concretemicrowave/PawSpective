import { View } from "react-native";
import { DetailCards } from "../DetailCards/DetailCards";
import dogBreedData from "../../constants/dogBreedData";
import { useWeightGoal } from "../../context/WeightGoalContext";
import HealthStatus from "../HealthStatus";

export default function DashboardContent({ latestEntry }) {
  const breedInfo = latestEntry?.breed ? dogBreedData[latestEntry.breed] : {};
  const { weightGoal } = useWeightGoal();
  console.log(latestEntry);

  return latestEntry ? (
    <View>
      <HealthStatus score={latestEntry.score} />
      <DetailCards
        age={latestEntry.age}
        weight={latestEntry.weight}
        symptoms={latestEntry.symptoms}
        avgWeight={weightGoal != null ? weightGoal : breedInfo?.avgWeightKg}
        avgLifespan={breedInfo?.avgLifespanYears}
      />
    </View>
  ) : null;
}
