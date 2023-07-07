import "./ActivityFeed.css";
import apiClient from "../../../services/apiClient";
import { useEffect, useState } from "react";

export default function ActivityFeed({ setAppState, appState }) {
  const [averageCalories, setAverageCalories] = useState();
  useEffect(() => {
    async function fetchUserNutrition() {
      const { data, error } = await apiClient.fetchNutritionList();
      if (data) setAppState({ ...appState, nutritions: data.nutritionList });
      if (error) setAppState(error);
    }
    fetchUserNutrition();
  }, []);

  useEffect(() => {
    const getDates = [
      ...new Set(
        appState.nutritions?.map((obj) =>
          new Date(obj.created_at).toLocaleDateString()
        )
      ),
    ];
    const numDays = getDates.length;
    const totalCalories = appState.nutritions?.reduce(
      (sum, obj) => sum + obj.calories,
      0
    );
    setAverageCalories(totalCalories / numDays);
  }, []);

  return (
    <div className="activity-feed">
      <div className="average-calories-container">
        <span>Average Calories Per Day:</span> <br/>
        <span>{averageCalories ? averageCalories : 0.0}</span>
      </div>
    </div>
  );
}
