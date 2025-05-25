import { createContext, useState, useContext } from "react";

const WeightGoalContext = createContext();

export const WeightGoalProvider = ({ children }) => {
  const [weightGoal, setWeightGoal] = useState(null);

  return (
    <WeightGoalContext.Provider value={{ weightGoal, setWeightGoal }}>
      {children}
    </WeightGoalContext.Provider>
  );
};

export const useWeightGoal = () => {
  return useContext(WeightGoalContext);
};
