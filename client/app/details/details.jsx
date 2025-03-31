import { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import {
  ThemedView,
  ThemedText,
  ThemedInput,
  ThemedNumberInput,
  ThemedButton,
} from "../../components/ThemedComponents";
import { DetailCards } from "../../components/DetailCards/DetailCards";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../context/UserContext";
import { useRouter } from "expo-router";

export default function Details({ uri }) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [symptoms, setSymptoms] = useState("");
  const [breed, setBreed] = useState("");

  const { savePost, predictData } = useAuth();
  const { userData, setUserData } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchPrediction = async () => {
      if (!uri) return;
      const result = await predictData(uri);
      if (result) {
        const data = JSON.parse(result);
        setBreed(data.breed || null);
        setWeight(data.weight || 0);
        setAge(data.age || 0);
        setSymptoms(data.symptoms || "No Symptoms");
      }
    };

    fetchPrediction();
  }, [uri]);

  const handleSave = async () => {
    const post = { name, weight, age, symptoms, breed, uri };
    const data = await savePost(post);
    if (!data.success) return Alert.alert("Error", data.message.message);

    setUserData({
      ...userData,
      posts: [...userData.posts, data.data.post],
    });
    router.replace("(tabs)");
  };

  return (
    <>
      <ThemedView scrollable style={styles.container}>
        <ThemedText type="subtitle" style={styles.title}>
          {breed
            ? `Your ${breed}!`
            : "Can't seem to find your pet, retake your photo with it in it."}
        </ThemedText>
        {breed && (
          <>
            <View style={styles.note}>
              <ThemedText style={{ fontSize: 14 }}>
                Results are AI, not always accurate.
              </ThemedText>
            </View>
            <ThemedInput
              value={name}
              onChangeText={setName}
              placeholder="Pet Name?"
              style={{ marginBottom: 12 }}
            />
            <View style={styles.inputContainer}>
              <ThemedNumberInput
                value={weight}
                setValue={setWeight}
                style={styles.numberInput}
                label="kg"
              />
              <ThemedNumberInput
                value={age}
                setValue={setAge}
                style={styles.numberInput}
                label="age (half yrs)"
              />
            </View>
            <ThemedInput
              value={symptoms}
              onChangeText={setSymptoms}
              placeholder="Symptoms"
            />
            <DetailCards
              weight={weight}
              age={age}
              symptoms={symptoms || "None"}
            />
          </>
        )}
      </ThemedView>
      {breed && (
        <ThemedButton
          style={styles.saveButton}
          title="Save"
          borderRadius={50}
          onPress={handleSave}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "68%",
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  numberInput: {
    flex: 1,
  },
  saveButton: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
  note: {
    backgroundColor: "#e6e6e6",
    padding: 4,
    borderRadius: 12,
    marginBottom: 12,
    width: "auto",
    alignItems: "center",
    opacity: 0.7,
  },
});
