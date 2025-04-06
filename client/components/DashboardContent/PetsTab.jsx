import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedComponents";

export default function PetsTab({ pets, selectedTab, setSelectedTab }) {
  const entries = Object.entries(pets);

  return (
    <ScrollView horizontal style={styles.petsTab}>
      {entries.map(([postId, pet], index) => (
        <TouchableOpacity
          key={postId}
          style={[
            styles.petCard,
            selectedTab === index && styles.selectedPetCard,
          ]}
          onPress={() => setSelectedTab(index)}
        >
          <ThemedText style={styles.petName}>{pet.name}</ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  petsTab: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    transform: [{ translateY: -295 }],
    width: "90%",
    marginLeft: "5%",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  petCard: {
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 12,
    margin: 5,
    minWidth: 90,
    alignItems: "center",
  },
  selectedPetCard: {
    backgroundColor: "#ffffff",
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
