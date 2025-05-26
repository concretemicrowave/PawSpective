import { useState, useEffect } from "react";
import { usePhoto } from "@/context/PhotoContext";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/hooks/useAuth";
import dogBreedData from "@/constants/dogBreedData";
import { useHandleSave } from "@/utils/handleSave";
import { useWeightGoal } from "@/context/WeightGoalContext";

export default function usePrediction(uri) {
  const { update, postId, setPostId } = usePhoto();
  const { userData, setUserData } = useUser();
  const { predictData } = useAuth();
  const handleSave = useHandleSave();
  const { weightGoal, setWeightGoal } = useWeightGoal();

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
      if (existingPost.weightGoal != null) {
        setWeightGoal(existingPost.weightGoal);
      }
    }
  }, [update, existingPost, setWeightGoal]);

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
        setWeightGoal(data.weight || 0);
        setFetchedPrediction(true);
      } catch {
        console.error("Failed to parse prediction:", result);
      }
    }

    fetchPrediction();
  }, [uri, update, fetchedPrediction, predictData, setWeightGoal]);

  const onSave = () =>
    handleSave({
      update,
      postId,
      userData,
      setUserData,
      setPostId,
      postFields: {
        name,
        weight,
        age,
        symptoms,
        breed,
        time,
        uri,
        weightGoal,
      },
    });

  return {
    predicting,
    breed,
    name,
    setName,
    weight,
    setWeight,
    age,
    setAge,
    symptoms,
    setSymptoms,
    averageHealthyWeight,
    averageLifespan,
    update,
    weightGoal,
    onSave,
  };
}
