import { useEffect } from "react";
import { fetchAllTours } from "../frontRoutes/fetchRoutes.js";
import { useState } from 'react';
export const getToursHook = () => {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    fetchAllTours().then(setTours);
    console.log("hook worked")
  }, []);
  return tours
}