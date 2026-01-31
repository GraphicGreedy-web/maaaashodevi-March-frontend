import { getAllTours } from "../api.js"
export const fetchAllTours = async () => {
    const res = await getAllTours();
    return res?.data?.tours;
};