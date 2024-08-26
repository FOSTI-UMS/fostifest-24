"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { selectUsersAndWorkshop, selectUsersAndCompetition } from "@/repositories/supabase";
import { CompetitionCategoriesConstant } from "@/constants/competitionCategoriesConstant";
import { mapToString } from "@/utils/utils";

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [workshop, setWorkshop] = useState([]);
  const [competitiveProgramming, setCompetitiveProgramming] = useState([]);
  const [softwareDevelopment, setSoftwareDevelopment] = useState([]);
  const [uiUxDesign, setUiUxDesign] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workshopData = await selectUsersAndWorkshop();
        setWorkshop(workshopData);

        const competitiveProgrammingData = await selectUsersAndCompetition(CompetitionCategoriesConstant.cp);
        setCompetitiveProgramming(competitiveProgrammingData);
        
        const softwareDevelopmentData = await selectUsersAndCompetition(CompetitionCategoriesConstant.sd);
        setSoftwareDevelopment(softwareDevelopmentData);
        
        const uiUxDesignData = await selectUsersAndCompetition(CompetitionCategoriesConstant.ud);
        setUiUxDesign(uiUxDesignData);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return <AdminContext.Provider value={{ competitiveProgramming, softwareDevelopment, uiUxDesign, workshop, loading }}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => useContext(AdminContext);
