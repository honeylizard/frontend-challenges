# Frontend Challenges

Challenges attempted from FrontendMentor.io

This codebase is also deployed to https://honeylizard.github.io/frontend-challenges/#/frontend-challenges/

## Job listings with filtering solution

This is a solution to the [Job listings with filtering challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt).

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Filter job listings based on the categories

### Solution Features

- Responsive Design
- Internationalization Capabilities
- WCAG 2.0 AA compliance (except for color contrasts as the color scheme is a hard requirement)
- Sorts the jobs list by featured jobs, then by new jobs, and then by the job position

## REST Countries API with color theme switcher

This is a solution to the [REST Countries API with color theme switcher](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).

### The challenge

Your challenge is to integrate with the [REST Countries V2 API](https://restcountries.com/#api-endpoints-v2) to pull country data and display it like in the designs.

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

### Solution Features

- Responsive Design
- Internationalization Capabilities
- WCAG 2.0 AA compliance (included a filter submission button as it was not included in design)
- Sorts the list by country name
- User can toggle between light and dark mode
- Basic caching of API calls
- Due to volume of API results, included lazy loading of images and loading suspense state for each result item in list page

## Bookmark landing page

This is a solution to the [Bookmark landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/bookmark-landing-page-5d0b588a9edda32581d29158).

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Receive an error message when the newsletter form is submitted if:
  - The input field is empty
  - The email address is not formatted correctly

### Solution Features

- Responsive Design
- Internationalization Capabilities
- WCAG 2.0 AA compliance (except for color contrasts as the color scheme is a hard requirement)

### Notes

- I did not include the blue shapes behind the illustrations as the mockups do not provide enough information on how it should look at different screen sizes. In cases like this, I would reach out to the UI/graphics team and discuss it's purpose and/or if it needs to be something different.
- the social media links on the mobile header nav are not at the bottom as there is a limitation with the modal package I am using.

## Calculator App

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29).

### The challenge

Your users should be able to:

- See the size of the elements adjust based on their device's screen size
- Perform mathematical operations like addition, subtraction, multiplication, and division
- Adjust the color theme based on their preference
- **Bonus**: Have their initial theme preference checked using `prefers-color-scheme` and have any additional changes saved in the browser

### Solution Features

- Responsive Design
- Internationalization Capabilities
- WCAG 2.0 AA compliance (except for color contrasts as the color scheme is a hard requirement)
- Switch between multiple themes
- The theme selected is stored locally so refreshing the page will not lose the choice

### Notes

I have added a basic view between the keypad and the output area to show the formula being entered for ease of use. The mockups do not include an area to show this.

## IP Address Tracker

This is a solution to the [IP Address Tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0).

### The challenge

Your users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Solution Features
- Responsive Design
- Internationalization Capabilities
- WCAG 2.0 AA compliance (except for color contrasts as the color scheme is a hard requirement)
- Visitor's IP is detected an initially shown
- Can query based on an IP address or a domain

### Notes

- To get the IP Address locations, Frontend Mentor suggests using the [IP Geolocation API by IPify](https://geo.ipify.org/). To generate the map, they recommend using [LeafletJS](https://leafletjs.com/).

- I decided to not let the user interact with the map as it is the result of the IP query rather than a free-for-all exploration of the world.

## To Do App

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW).

### The challenge

Your users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Solution Features
- Responsive Design
- Internationalization Capabilities
- WCAG 2.0 AA compliance (except for color contrasts as the color scheme is a hard requirement)
- User can toggle between light and dark mode

### Notes

- I have not implemented the bonus feature of drag and drop. Might come back to that later...
- The list defaults to the example items to begin with and then checks for what is stored in localStorage going forward. Clear that data in order to "reset" the app

## Time Tracking Dashboard

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw).

### The challenge

Your users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch between viewing Daily, Weekly, and Monthly stats

### Solution Features

- Responsive Design
- Internationalization Capabilities
- WCAG 2.0 AA compliance (except for color contrasts as the color scheme is a hard requirement)
- User can toggle between the time views (e.g. daily, weekly, monthly)

## Multi Step Form

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ).

### The challenge

Your users should be able to:

- Complete each step of the sequence
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Solution Features

- Responsive Design
- Internationalization Capabilities
- WCAG 2.0 AA compliance (except for color contrasts as the color scheme is a hard requirement)
- User can fill out the form and see their progress
- User will see error messages if they do not correctly enter the requested information
- User will see a success screen once the form is submitted

### Notes

- I did not implement the sticky footer for the buttons on smaller devices screens

## Notifications Page

This is a solution to the [Notifications page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/notifications-page-DqK5QAmKbC).

### The challenge

Your users should be able to:

- Distinguish between "unread" and "read" notifications
- Select "Mark all as read" to toggle the visual state of the unread notifications and set the number of unread messages to zero
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Solution Features

- Responsive Design
- Internationalization Capabilities
- WCAG 2.0 AA compliance (except for color contrasts as the color scheme is a hard requirement)
- User can mark all unread/new items as read/not new via the "Mark all as read" button

## Expenses Chart Page

This is a solution to the [Expenses chart component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/expenses-chart-component-e7yJBUdjwt).

### The challenge

Your users should be able to:

- View the bar chart and hover over the individual bars to see the correct amounts for each day
- See the current day’s bar highlighted in a different colour to the other bars
- View the optimal layout for the content depending on their device’s screen size
- See hover states for all interactive elements on the page
- **Bonus**: Use the JSON data file provided to dynamically size the bars on the chart

### Solution Features

- Responsive Design
- Internationalization Capabilities
- WCAG 2.0 AA compliance (except for color contrasts as the color scheme is a hard requirement)
- Chart's data is based on the JSON data file
- highlighted bar in chart is based on user's current day of the week

## Age Calculator App

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q/).

### The challenge

Your users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The date is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Solution Features

- Responsive Design
- Internationalization Capabilities
- WCAG 2.0 AA compliance (except for color contrasts as the color scheme is a hard requirement)

## E-commerce Product Page

This is a solution to the [E-commerce Product Page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6/).

### The challenge

Your users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Open a lightbox gallery by clicking on the large product image
- Switch the large product image by clicking on the small thumbnail images
- Add items to the cart
- View the cart and remove items from it

### Solution Features

- Responsive Design
- Internationalization Capabilities
- WCAG 2.0 AA compliance (except for color contrasts as the color scheme is a hard requirement)
