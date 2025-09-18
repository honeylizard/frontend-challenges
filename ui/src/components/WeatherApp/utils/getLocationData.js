import axios from "axios";

const BASE_URL = "https://geocoding-api.open-meteo.com";
const LOCATION_GEOCODING_ENDPOINT = "/v1/search";

export const getLocationData = (searchTerm, locale, setShowDropdown, setIsLoadingResults, setResults) => {
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
    params.set("count", "4");

    setShowDropdown(true);
    setIsLoadingResults(true);
    axios
        .get(`${BASE_URL}${LOCATION_GEOCODING_ENDPOINT}?${params.toString()}`)
        .then((response) => {
            console.log("response", response);

            if (response.data.results) {
                const parsedLocationList = response.data.results.map((result) => {
                    const locationData = result || {};
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
                    return newLocationData;
                });

                setResults(parsedLocationList);
            } else {
                // something, perhaps an error to handle here?
            }
        })
        .catch((error) => {
            console.error("Error Searching: ", error?.message);
            setShowDropdown(false);
        })
        .finally(() => {
            setIsLoadingResults(false);
        });
};
