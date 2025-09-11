import axios from "axios";

const BASE_URL = "https://geocoding-api.open-meteo.com";
const LOCATION_GEOCODING_ENDPOINT = "/v1/search";

export const getLocationData = (searchTerm, locale, updateWeatherAppData, setShowResults, setShowError) => {
    // API takes in zip code or city/country (no country codes) => "Atlanta, United States", or "Berlin, Germany", or "30066"
    // "Atlanta" returns multiple results
    // could add &countryCode=US to query to limit to USA?

    // String to search for. An empty string or only 1 character will return an empty result.
    // 2 characters will only match exact matching locations.
    // 3 and more characters will perform fuzzy matching.
    // The search string can be a location name or a postal code.

    const params = new URLSearchParams();
    params.set("name", searchTerm);
    params.set("language", locale);
    params.set("format", "json");
    params.set("count", "1");

    updateWeatherAppData({ isLoading: true });
    setShowResults(false);
    setShowError(false);
    axios
        .get(`${BASE_URL}${LOCATION_GEOCODING_ENDPOINT}?${params.toString()}`)
        .then((response) => {
            console.log("response", response);

            if (response.data.results) {
                // TODO: Only picking the first result, but we will eventually shift to using all the results once the auto-complete is configured
                const locationData = response.data.results[0] || {};
                const { admin1: state, admin2: county, name: city, country, latitude, longitude } = locationData;
                const newLocationData = {
                    name: [city, country].join(", "),
                    city,
                    county,
                    state,
                    country,
                    latitude,
                    longitude,
                };

                updateWeatherAppData({
                    currentLocation: newLocationData,
                });
                setShowResults(true);
            } else {
                // something
            }
        })
        .catch((error) => {
            console.error("Error Searching: ", error?.message);
            setShowError(true);
            updateWeatherAppData({
                currentLocation: null,
            });
        })
        .finally(() => {
            // updateWeatherAppData({ isLoading: true });
        });
};
