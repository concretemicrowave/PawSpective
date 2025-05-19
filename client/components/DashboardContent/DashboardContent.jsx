import { View } from "react-native";
import { DetailCards } from "../DetailCards/DetailCards";
import dogBreedData from "../../constants/dogBreedData";
import HealthStatus from "../HealthStatus";

export default function DashboardContent({ latestEntry }) {
  const breedInfo = latestEntry?.breed ? dogBreedData[latestEntry.breed] : {};

  return latestEntry ? (
    <View>
      <HealthStatus score={latestEntry.score} />
      <DetailCards
        age={latestEntry.age}
        weight={latestEntry.weight}
        symptoms={latestEntry.symptoms}
        avgWeight={breedInfo?.avgWeightKg}
        avgLifespan={breedInfo?.avgLifespanYears}
      />
    </View>
  ) : null;
}
