import { useEffect } from "react";
import { fetchAllTours, fetchContact } from "../frontRoutes/fetchRoutes.js";
import { useState } from 'react';
import axios from "axios";
export const getToursHook = () => {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    fetchAllTours().then(setTours);
    console.log("hook worked")
  }, []);
  return tours
}
export const useContactHook = () => {
  const submitContact = async (formData) => {
    return await fetchContact(formData)
  };
  return submitContact;
}