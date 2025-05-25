import { View, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "../../ThemedComponents";

export default function PetInfo({ pet, isSelected }) {
  const latestImageUri = pet.history?.[pet.history.length - 1]?.uri;

  return (
    <View style={styles.row}>
      <Image
        source={{
          uri: latestImageUri || "https://place-puppy.com/80x80",
        }}
        style={styles.avatar}
      />
      <ThemedText style={styles.petName} numberOfLines={1} ellipsizeMode="tail">
        {pet.name}
      </ThemedText>
      {isSelected && (
        <MaterialIcons
          name="check-circle"
          size={20}
          color="#4a70e2"
          style={{ marginLeft: 8 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "visible",
  },
  petName: {
    fontSize: 18,
    marginLeft: 12,
    maxWidth: "65%",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ccc",
  },
});
