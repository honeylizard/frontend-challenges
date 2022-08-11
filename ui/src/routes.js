import BookmarkLandingPage from "./components/BookmarkLandingPage/BookmarkLandingPage";
import CalculatorApp from "./components/CalculatorApp/CalculatorApp";
import CountriesListPage from "./components/CountriesList/pages/CountriesListPage";
import CountryDetailsPage from "./components/CountriesList/pages/CountryDetailsPage";
import HomePage from "./components/HomePage";
import IpAddressTrackerPage from "./components/InternetProtocolAddressTracker/IpAddressTrackerPage";
import NotFoundPage from "./components/NotFoundPage";
import StaticJobListingsPage from "./components/StaticJobListings/StaticJobListingsPage";
import TodoAppPage from "./components/TodoApp/TodoAppPage";

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
        name: "Bookmark Manager - Landing Page Challenge",
        path: "/frontend-challenges/bookmark-landing-page",
        authNeeded: false,
        exact: true,
        component: BookmarkLandingPage,
    },
    {
        name: "Calculator app",
        path: "/frontend-challenges/calculator-app",
        authNeeded: false,
        exact: true,
        component: CalculatorApp,
    },
    {
        name: "IP Address Tracker",
        path: "/frontend-challenges/ip-address-tracker",
        authNeeded: false,
        exact: true,
        component: IpAddressTrackerPage,
    },
    {
        name: "To Do App",
        path: "/frontend-challenges/todo-app",
        authNeeded: false,
        exact: true,
        component: TodoAppPage,
    },
    {
        name: "Not Found",
        path: "*",
        component: NotFoundPage,
    },
];

export default routes;
