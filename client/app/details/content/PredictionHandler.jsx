import React from "react";
import { View } from "react-native";
import PredictionHeader from "./PredictionHeader";
import PetForm from "./PetForm";
import LoadingSkeleton from "./LoadingSkeleton";

export default function PredictionHandler({
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
}) {
  if (predicting) return <LoadingSkeleton />;

  return (
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
  );
}
