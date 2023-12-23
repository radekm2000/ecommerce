import { useTheme } from "@mui/joy";
import { useEffect, useState } from "react";

// MUI Breakpoints
type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export const useMediaQuery = (breakpoint: Breakpoint | number) => {
  const theme = useTheme();

  const getMediaQueryForBreakpoint = (breakpoint: Breakpoint | number) => {
    const query = theme.breakpoints.down(breakpoint);
    const normalized = query.startsWith("@media")
      ? query.substring(6).trim()
      : query;
    return window.matchMedia(normalized);
  };

  const [matches, setMatches] = useState(
    getMediaQueryForBreakpoint(breakpoint).matches
  );

  useEffect(() => {
    const mediaQuery = getMediaQueryForBreakpoint(breakpoint);
    mediaQuery.addEventListener("change", (e) => {
      setMatches(e.matches);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpoint]);

  return matches;
};
