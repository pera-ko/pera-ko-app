import { useLocation } from "react-router";

export function useLocQuery() {
  return new URLSearchParams(useLocation().search);
}