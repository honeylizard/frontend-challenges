import axios from "axios";

const axiosGet = (path) => {
    return axios.get(path).then((response) => {
        console.group("API GET");
        console.log("fetch response", response);
        console.groupEnd();

        if (response.status === 200) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response);
        }
    });
};

export { axiosGet };
