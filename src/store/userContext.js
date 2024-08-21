import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { getCurrentUserData, getCompetitionDataList, getWorkshopData, getServerTime, signOut, getBundleDataList } from "@/repositories/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { mapToString } from "@/utils/utils";

const UserContext = createContext(null);
const supabase = createClientComponentClient();

export const UserProvider = ({ children }) => {
  const sectionRefs = {
    home: useRef(null),
    eventDetails: useRef(null),
    competitions: useRef(null),
    workshop: useRef(null),
  };
  const [user, setUser] = useState(null);
  const [competitions, setCompetitions] = useState([]);
  const [workshop, setWorkshop] = useState(null);
  const [workshopBundle, setWorkshopBundle] = useState(null);
  const [competitionBundle, setCompetitionBundle] = useState(null);
  const [gettingUser, setGettingUser] = useState(true);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [now, setNow] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData?.session) {
          setSession(sessionData.session);

          const userData = await getCurrentUserData();
          setUser(userData);
          setGettingUser(false);

          const nowData = await getServerTime();
          setNow(nowData);

          if (userData.workshopId != null) {
            const workshopData = await getWorkshopData();
            setWorkshop(workshopData);
          }

          if (userData.competitionId && userData.competitionId.length > 0) {
            const competitionData = await getCompetitionDataList(userData.competitionId);
            setCompetitions(competitionData);
          }

          if (userData.bundle && userData.bundle.length > 0) {
            const bundleData = await getBundleDataList(userData.bundle);
            setWorkshopBundle(bundleData[0]);
            setCompetitionBundle(bundleData[1]);
          }
        } else {
          setSession(null);
        }
      } catch (error) {
      } finally {
        setLoading(false);
        setGettingUser(false);
      }
    };

    fetchUser();
  }, []);

  const isLoggedIn = !!session;

  return <UserContext.Provider value={{workshopBundle, competitionBundle, now, gettingUser, sectionRefs, user, competitions, workshop, loading, session, isLoggedIn }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
