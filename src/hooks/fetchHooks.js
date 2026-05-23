import { useEffect } from "react";
import { fetchAllTours, fetchContact, fetchReviews, fetchSubmitReview } from "../frontRoutes/fetchRoutes.js";
import { useState } from 'react';
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
export const getReviewsHook = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetchReviews().then(setReviews);
  }, []);
  return { reviews, setReviews };
}
export const useReviewHook = () => {
  const submitReview = async (formData) => {
    return await fetchSubmitReview(formData);
  };
  return submitReview;
}
