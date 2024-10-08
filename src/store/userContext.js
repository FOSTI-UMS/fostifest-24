import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { getCurrentUserData, getCompetitionDataList, getWorkshopData, getBundleDataList } from "@/repositories/supabase";
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
  const [currentUser, setCurrentUser] = useState(null);
  const [competitions, setCompetitions] = useState([]);
  const [workshop, setWorkshop] = useState(null);
  const [workshopBundle, setWorkshopBundle] = useState(null);
  const [competitionBundle, setCompetitionBundle] = useState(null);
  const [gettingUser, setGettingUser] = useState(true);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [now, setNow] = useState(null);

  const eventEnd = new Date(process.env.NEXT_PUBLIC_COUNTDOWN_END_EVENT);
  const registrationEnd = new Date(process.env.NEXT_PUBLIC_COUNTDOWN_END_DATE);
  const workshopRegistrationEnd = new Date(process.env.NEXT_PUBLIC_COUNTDOWN_END_WORKSHOP_DATE);
  const updateEnd = new Date(process.env.NEXT_PUBLIC_COUNTDOWN_END_UPDATE);
  const submissionStarted = new Date(process.env.NEXT_PUBLIC_COUNTDOWN_START_SUBMISSION);
  const submissionEnded = new Date(process.env.NEXT_PUBLIC_COUNTDOWN_END_SUBMISSION);

  useEffect(() => {
    const fetchUser = async () => {     
      try {
        const { data: sessionData } = await supabase.auth.getSession();

        const response = await fetch("https://timeapi.io/api/time/current/zone?timeZone=Asia%2FJakarta");
        const data = await response.json();
        const nowData =  new Date(data.dateTime);
        setNow(nowData);

        if (sessionData?.session) {
          setSession(sessionData.session);

          const currentUserData = await supabase.auth.getUser();
          setCurrentUser(currentUserData)

          const userData = await getCurrentUserData(currentUserData);
          setUser(userData);
          setGettingUser(false);

          if (userData.workshopId != null) {
            const workshopData = await getWorkshopData(currentUserData);
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

  return (
    <UserContext.Provider
      value={{
        currentUser,
        eventEnd,
        workshopRegistrationEnd,
        submissionStarted,
        submissionEnded,
        updateEnd,
        registrationEnd,
        workshopBundle,
        competitionBundle,
        now,
        gettingUser,
        sectionRefs,
        user,
        competitions,
        workshop,
        loading,
        session,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
