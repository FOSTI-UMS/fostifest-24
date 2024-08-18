import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUserData, getCompetitionDataList, getWorkshopData } from "@/repositories/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const UserContext = createContext(null);
const supabase = createClientComponentClient();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [competitions, setCompetitions] = useState([]);
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData?.session) {
          setSession(sessionData.session);

          const userData = await getCurrentUserData();
          setUser(userData);

          if (userData.workshopId != null) {
            const workshopData = await getWorkshopData();
            setWorkshop(workshopData);
          }

          if (userData.competitionId && userData.competitionId.length > 0) {
            const competitionData = await getCompetitionDataList(userData.competitionId);
            setCompetitions(competitionData);
          }
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error("Error fetching user or competition data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const isLoggedIn = !!session;

  return <UserContext.Provider value={{ user, competitions, workshop, loading, session, isLoggedIn }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
