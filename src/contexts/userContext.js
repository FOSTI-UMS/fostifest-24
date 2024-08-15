import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUserData, getCompetitionDataList, getWorkshopData } from "@/lib/supabase";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [competitions, setCompetitions] = useState([]);
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUserData();
        setUser(userData);

        if (userData.workshopId != null) {
          const workshopData = await getWorkshopData(userData.id);
          setWorkshop(workshopData);
        }

        if (userData.competitionId && userData.competitionId.length > 0) {
          const competitionData = await getCompetitionDataList(userData.competitionId);
          setCompetitions(competitionData);
        }
      } catch (error) {
        console.error("Error fetching user or competition data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, competitions, workshop, loading }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
