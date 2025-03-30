import { StyleSheet, View, Alert } from "react-native";
import {
  ThemedView,
  ThemedText,
  ThemedInput,
  ThemedNumberInput,
  ThemedButton,
} from "../../components/ThemedComponents";
import { DetailCards } from "../../components/DetailCards/DetailCards";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../context/UserContext";
import { useRouter } from "expo-router";

export default function Details({ uri }) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [symptoms, setSymptoms] = useState("");
  const [breed, setBreed] = useState("*Golden Retriever");
  const { savePost } = useAuth();
  const { userData, setUserData } = useUser();
  const router = useRouter();
  const post = {
    name,
    weight,
    age,
    symptoms,
    breed,
    uri,
  };

  const handleSave = async () => {
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
        <ThemedText style={styles.title}>* Insert Breed</ThemedText>
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
            label="age(half yrs)"
          />
        </View>
        <ThemedInput
          value={name}
          onChangeText={setName}
          placeholder="Pet Name"
        />
        <ThemedInput
          value={symptoms}
          placeholder="Symptoms"
          onChangeText={setSymptoms}
        />
        <DetailCards
          weight={weight}
          age={age}
          symptoms={symptoms === "" ? "None" : symptoms}
        />
      </ThemedView>
      <ThemedButton
        style={styles.saveButton}
        title="Save"
        borderRadius={50}
        onPress={handleSave}
      />
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
    transform: [{ translateY: -4 }],
  },
  saveButton: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
});
