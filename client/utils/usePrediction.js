import { useState, useEffect, useRef, useCallback } from "react";
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

  const existingPost = useRef(
    postId != null ? userData.posts?.[postId] : null,
  ).current;

  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [symptoms, setSymptoms] = useState("");
  const [breed, setBreed] = useState("");
  const [time, setTime] = useState(null);
  const [averageHealthyWeight, setAverageHealthyWeight] = useState(null);
  const [averageLifespan, setAverageLifespan] = useState(null);
  const [predicting, setPredicting] = useState(false);

  const fetchedRef = useRef(false);

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
    let isMounted = true;
    if (!uri || fetchedRef.current) return;

    const doFetch = async () => {
      setPredicting(true);
      const result = await predictData(uri);
      if (!isMounted) return;
      setPredicting(false);
      if (!result) return;

      try {
        const data = typeof result === "string" ? JSON.parse(result) : result;
        const breedName = data.breed || "";
        const info = dogBreedData[breedName] || {};

        if (!update) setBreed(breedName);
        setWeight(data.weight || 0);
        setAge(data.age || 0);
        setSymptoms(data.symptoms || "No Symptoms");
        setTime(new Date().toISOString().slice(0, 10));
        setAverageHealthyWeight(info.avgWeightKg || null);
        setAverageLifespan(info.avgLifespanYears || null);
        setWeightGoal(data.weight || 0);

        fetchedRef.current = true;
      } catch (err) {
        console.error("Failed to parse prediction:", err);
      }
    };

    doFetch();
    return () => {
      isMounted = false;
    };
  }, [uri, predictData, update, setWeightGoal]);

  const onSave = useCallback(() => {
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
  }, [
    update,
    postId,
    userData,
    setUserData,
    setPostId,
    name,
    weight,
    age,
    symptoms,
    breed,
    time,
    uri,
    weightGoal,
    handleSave,
  ]);

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
