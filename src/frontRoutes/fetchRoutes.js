import { getAllTours, getReviewsRoute, submitContactRoute, submitReviewRoute } from "../api.js"

const TOURS_CACHE_KEY = "tour-booking:tours-cache";
const TOURS_CACHE_TTL_MS = 1000 * 60 * 30;

const canUseStorage = () => typeof window !== "undefined" && !!window.localStorage;

export const getCachedTours = () => {
    if (!canUseStorage()) return null;

    try {
        const rawCache = window.localStorage.getItem(TOURS_CACHE_KEY);
        if (!rawCache) return null;

        const parsedCache = JSON.parse(rawCache);
        if (!Array.isArray(parsedCache?.tours)) return null;

        const isFresh = Date.now() - Number(parsedCache?.updatedAt || 0) < TOURS_CACHE_TTL_MS;
        return {
            tours: parsedCache.tours,
            isFresh,
        };
    } catch {
        return null;
    }
};

const setCachedTours = (tours) => {
    if (!canUseStorage() || !Array.isArray(tours)) return;

    try {
        window.localStorage.setItem(
            TOURS_CACHE_KEY,
            JSON.stringify({
                tours,
                updatedAt: Date.now(),
            }),
        );
    } catch {
        // Ignore storage write failures
    }
};

export const fetchAllTours = async ({ forceRefresh = false } = {}) => {
    const cachedTours = getCachedTours();

    if (!forceRefresh && cachedTours?.isFresh) {
        return cachedTours.tours;
    }

    const res = await getAllTours();
    const tours = res?.data?.tours ?? [];
    setCachedTours(tours);
    return tours;
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
