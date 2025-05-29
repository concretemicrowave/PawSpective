import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./UserContext";

const WeightGoalContext = createContext();

export const WeightGoalProvider = ({ children }) => {
  const { userData, latestPostId } = useUser();
  const [weightGoal, setWeightGoal] = useState(null);

  useEffect(() => {
    if (
      userData?.posts &&
      latestPostId != null &&
      userData.posts[latestPostId]?.weightGoal != null
    ) {
      setWeightGoal(userData.posts[latestPostId].weightGoal);
    }
  }, [userData.posts, latestPostId]);

  return (
    <WeightGoalContext.Provider value={{ weightGoal, setWeightGoal }}>
      {children}
    </WeightGoalContext.Provider>
  );
};

export const useWeightGoal = () => {
  return useContext(WeightGoalContext);
};
