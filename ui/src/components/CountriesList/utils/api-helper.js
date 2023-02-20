import axios from "axios";

const axiosGet = (path) => {
    const CACHE_MINUTES_LIMIT = 5;

    const cachedPath = localStorage.getItem(path);
    if (cachedPath) {
        const cachedObject = JSON.parse(cachedPath);
        cachedObject.timestamp = new Date(cachedObject.timestamp);
        const currentDate = new Date();
        const difference = currentDate.getMinutes() - cachedObject.timestamp.getMinutes();
        if (difference < CACHE_MINUTES_LIMIT) {
            console.group("API GET");
            console.log("pulling from cache", cachedObject);
            console.groupEnd();
            return Promise.resolve(cachedObject.data);
        }
    }
    return axios.get(path).then((response) => {
        console.group("API GET");
        console.log("fetch response", response);
        console.groupEnd();

        if (response.status === 200) {
            localStorage.setItem(
                path,
                JSON.stringify({
                    data: response.data,
                    timestamp: Date.now(),
                })
            );

            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response);
        }
    });
};

export { axiosGet };
