import { getAllTours, getReviewsRoute, submitContactRoute, submitReviewRoute } from "../api.js"
export const fetchAllTours = async () => {
    const res = await getAllTours();
    return res?.data?.tours;
};
export const fetchContact = async (formData) => {
    const res = await submitContactRoute(formData);
    return res?.data;
}
export const fetchReviews = async () => {
    const res = await getReviewsRoute();
    return res?.data?.reviews || [];
}
export const fetchSubmitReview = async (formData) => {
    const res = await submitReviewRoute(formData);
    return res?.data;
}
