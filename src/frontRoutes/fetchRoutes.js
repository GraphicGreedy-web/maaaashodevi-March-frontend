import { getAllTours, submitContactRoute } from "../api.js"
export const fetchAllTours = async () => {
    const res = await getAllTours();
    return res?.data?.tours;
};
export const fetchContact = async (formData) => {
    const res = await submitContactRoute(formData);
    console.log("fetched: ", res?.data)
    return res?.data;
}