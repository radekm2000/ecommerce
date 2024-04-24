import { useLocation as useWouterLocation } from "wouter";

export const useCustomUseLocation = () => {
  const [location, setLocation] = useWouterLocation();
  return [location, setLocation, window.location.search] as const
};
