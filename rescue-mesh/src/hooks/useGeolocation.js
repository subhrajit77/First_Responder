import { useState, useEffect, use } from "react";

export function useGeolocation() {
    const [location, setLocation] = useState({
        lat: null,
        lng: null,
        error: null,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation((prev) => ({
                ...prev,
                error: "Geolocation is not supported by your browser",
            }));
            return;
        }

        const handleSuccess = (position) => {
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                error: null,
            });
        };

        const handleError = (error) => {
            setLocation((prev) => ({ ...prev, error: error.message }));
        };
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }, []);

    return location;
}
