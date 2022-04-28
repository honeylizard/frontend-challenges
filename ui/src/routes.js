import CountriesListPage from "./components/CountriesList/pages/CountriesListPage";
import CountryDetailsPage from "./components/CountriesList/pages/CountryDetailsPage";
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
        name: "Homepage",
        path: "/frontend-challenges",
        authNeeded: false,
        exact: true,
        component: HomePage,
    },
    {
        name: "Static Job Listings Challenge",
        path: "/frontend-challenges/static-job-listings",
        authNeeded: false,
        exact: true,
        component: StaticJobListingsPage,
    },
    {
        name: "Countries API Challenge",
        path: "/frontend-challenges/countries-api",
        authNeeded: false,
        exact: true,
        component: CountriesListPage,
    },
    {
        name: "Countries API Challenge Details Page",
        path: "/frontend-challenges/countries-api/country/:id",
        authNeeded: false,
        exact: true,
        component: CountryDetailsPage,
    },
    {
        name: "Not Found",
        path: "*",
        component: NotFoundPage,
    },
];

export default routes;
