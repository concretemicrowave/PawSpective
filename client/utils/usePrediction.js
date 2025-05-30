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
  const [saving, setSaving] = useState(false);

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
      try {
        const result = await predictData(uri);
        if (!isMounted || !result?.success) return;

        const pet = result.data?.pet;
        if (!pet) return;

        const breedName = pet.breed || "";
        const info = dogBreedData[breedName] || {};

        if (!update) setBreed(breedName);
        setWeight(pet.weight || 0);
        setAge(pet.age || 0);
        setSymptoms(pet.symptoms || "No Symptoms");
        setTime(new Date().toISOString().slice(0, 10));
        setAverageHealthyWeight(info.avgWeightKg || null);
        setAverageLifespan(info.avgLifespanYears || null);
        setWeightGoal(pet.weight || 0);

        fetchedRef.current = true;
      } catch (err) {
        console.error("Prediction or parsing failed:", err);
      } finally {
        if (isMounted) setPredicting(false);
      }
    };

    doFetch();
    return () => {
      isMounted = false;
    };
  }, [uri, predictData, update, setWeightGoal]);

  const onSave = useCallback(async () => {
    setSaving(true);
    try {
      await handleSave({
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
    } catch (e) {
      console.error("Failed to save:", e);
    } finally {
      setSaving(false);
    }
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
    saving,
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
