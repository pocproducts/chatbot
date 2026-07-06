"use client";

import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";

export interface Profile {
  id: string;
  name: string;
  createdAt: string;
  cookiesDomains: string[];
  isAuthenticated?: boolean;
}

const DEFAULT_PROFILES: Profile[] = [
  {
    id: "prof_48x",
    name: "Default Taxpayer Profile",
    createdAt: "2026-07-06",
    cookiesDomains: ["arca.gob.ar", "rentascordoba.gob.ar"],
    isAuthenticated: true,
  },
  {
    id: "prof_mj2",
    name: "Alternative Corp Profile",
    createdAt: "2026-07-05",
    cookiesDomains: ["arca.gob.ar"],
    isAuthenticated: false,
  },
];

export function useProfiles() {
  const { data: profiles, mutate: setProfiles } = useSWR<Profile[]>(
    "execution-profiles",
    null,
    { fallbackData: DEFAULT_PROFILES }
  );

  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("profiles-store");
      if (saved) {
        try {
          setProfiles(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to load profiles", e);
        }
      }
      setIsInitialized(true);
    }
  }, [setProfiles]);

  // Sync to localStorage
  useEffect(() => {
    if (isInitialized && profiles) {
      localStorage.setItem("profiles-store", JSON.stringify(profiles));
    }
  }, [profiles, isInitialized]);

  const addProfile = useCallback(
    (name: string, domains: string[] = []) => {
      const newProfile: Profile = {
        id: `prof_${Math.random().toString(36).substring(2, 7)}`,
        name,
        createdAt: new Date().toISOString().split("T")[0],
        cookiesDomains: domains,
        isAuthenticated: false,
      };

      setProfiles((prev) => {
        const current = prev ?? DEFAULT_PROFILES;
        return [...current, newProfile];
      }, false);

      return newProfile;
    },
    [setProfiles]
  );

  const updateProfileName = useCallback(
    (id: string, newName: string) => {
      setProfiles((prev) => {
        const current = prev ?? DEFAULT_PROFILES;
        return current.map((p) => (p.id === id ? { ...p, name: newName } : p));
      }, false);
    },
    [setProfiles]
  );

  const deleteProfile = useCallback(
    (id: string) => {
      setProfiles((prev) => {
        const current = prev ?? DEFAULT_PROFILES;
        return current.filter((p) => p.id !== id);
      }, false);
    },
    [setProfiles]
  );

  const setProfileAuth = useCallback(
    (id: string, isAuthenticated: boolean) => {
      setProfiles((prev) => {
        const current = prev ?? DEFAULT_PROFILES;
        return current.map((p) =>
          p.id === id ? { ...p, isAuthenticated } : p
        );
      }, false);
    },
    [setProfiles]
  );

  return {
    profiles: profiles ?? DEFAULT_PROFILES,
    addProfile,
    updateProfileName,
    deleteProfile,
    setProfileAuth,
  };
}
