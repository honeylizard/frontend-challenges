import HomePage from "./components/HomePage";
import NotFoundPage from "./components/NotFoundPage";
import StaticJobListingsPage from "./components/StaticJobListings/StaticJobListingsPage";

const routes = [
    {
        name: "Homepage",
        path: "/",
        authNeeded: false,
        exact: true,
        component: HomePage,
    },
    {
        name: "Static Job Listings Challenge",
        path: "/static-job-listings",
        authNeeded: false,
        exact: true,
        component: StaticJobListingsPage,
    },
    {
        name: "Not Found",
        path: "*",
        component: NotFoundPage,
    },
];

export default routes;
