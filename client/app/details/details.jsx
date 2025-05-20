import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "../../components/ThemedComponents";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../context/UserContext";
import { usePhoto } from "../../context/PhotoContext";
import PredictionHeader from "./content/PredictionHeader";
import PetForm from "./content/PetForm";
import SaveButton from "./content/SaveButton";
import { handleSave } from "../../utils/handleSave";
import dogBreedData from "../../constants/dogBreedData";
import LoadingSkeleton from "./content/LoadingSkeleton";

export default function Details({ uri }) {
  const router = useRouter();
  const { update, postId, setPostId } = usePhoto();
  const { userData, setUserData } = useUser();
  const { savePost, predictData } = useAuth();
  const existingPost = postId != null ? userData.posts?.[postId] : null;

  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [symptoms, setSymptoms] = useState("");
  const [breed, setBreed] = useState("");
  const [time, setTime] = useState(null);
  const [averageHealthyWeight, setAverageHealthyWeight] = useState(null);
  const [averageLifespan, setAverageLifespan] = useState(null);

  const [predicting, setPredicting] = useState(false);
  const [fetchedPrediction, setFetchedPrediction] = useState(false);

  useEffect(() => {
    if (update && existingPost) {
      setName(existingPost.name || "");
      setBreed(existingPost.breed || "");
    }
  }, [update, existingPost]);

  useEffect(() => {
    async function fetchPrediction() {
      if (!uri || fetchedPrediction) return;
      setPredicting(true);
      const result = await predictData(uri);
      setPredicting(false);
      if (!result) return;
      try {
        const data = typeof result === "string" ? JSON.parse(result) : result;

        const breedName = data.breed || "";
        const breedInfo = dogBreedData[breedName] || {};

        if (!update) setBreed(breedName);
        setWeight(data.weight || 0);
        setAge(data.age || 0);
        setSymptoms(data.symptoms || "No Symptoms");
        setTime(new Date().toISOString().slice(0, 10));
        setAverageHealthyWeight(breedInfo.avgWeightKg || null);
        setAverageLifespan(breedInfo.avgLifespanYears || null);

        setFetchedPrediction(true);
      } catch {
        console.error("Failed to parse prediction:", result);
      }
    }

    fetchPrediction();
  }, [uri, update, fetchedPrediction]);

  const onSave = () =>
    handleSave({
      update,
      postId,
      userData,
      setUserData,
      setPostId,
      router,
      savePost,
      postFields: { name, weight, age, symptoms, breed, time, uri },
    });

  return (
    <>
      <ThemedView scrollable style={styles.container}>
        {predicting && <LoadingSkeleton />}
        {!predicting && (
          <>
            <PredictionHeader predicting={predicting} breed={breed} />
            {breed && (
              <View>
                <PetForm
                  name={name}
                  setName={setName}
                  weight={weight}
                  setWeight={setWeight}
                  age={age}
                  setAge={setAge}
                  symptoms={symptoms}
                  setSymptoms={setSymptoms}
                  averageHealthyWeight={averageHealthyWeight}
                  averageLifespan={averageLifespan}
                />
              </View>
            )}
          </>
        )}
      </ThemedView>
      {!predicting && (
        <SaveButton breed={breed} update={update} onPress={onSave} />
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
});
