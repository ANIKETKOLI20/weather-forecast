## Weather Forecast Web Application

This is a React application that displays a list of cities with search, sorting, and filtering functionalities using Apollo Client for data fetching, MUI DataGrid for displaying data, and Tailwind CSS for styling.

## Features

- **Search Functionality**: Allows users to search for cities by name.
- **Sorting**: Columns can be sorted by clicking on the header (City, Country, Timezone).
- **Responsive Design**: Adjusts layout for small screens using MUI's `useMediaQuery`.
- **Debounced Search**: Reduces the number of queries sent to the server with a 500ms debounce on the search input.
- **Row Actions**: Clicking or right-clicking on a row opens a new tab with weather information for the selected city.
- **Error Handling**: Displays error messages if the data fails to load.
- **Loading State**: Shows a loading spinner while fetching data.

## Demo

### Video

Watch the demo video to see the application in action:

https://drive.google.com/file/d/1xhsfksa2nkzaLpitpabxBxgetGBUsW9a/view?usp=sharing

## Technologies Used

- **React**: For building the user interface.
- **Apollo Client**: For fetching data from a GraphQL API.
- **MUI (Material-UI)**: For components like DataGrid, TextField, and CircularProgress.
- **Tailwind CSS**: For utility-first CSS styling.
- **React Router**: For navigation and handling routes.
- **JavaScript**: Core programming language used.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed on your machine.
- Basic understanding of React, GraphQL, and JavaScript.

## Getting Started

To get a local copy of this project up and running, follow these steps.


## Project Structure
 src/: Contains the source code for the application.
 components/: Contains reusable React components.
 pages/: Contains main pages for the application.
 App.js: Main entry point for the application.

## Customization
Tailwind CSS: Customize styles by modifying Tailwind classes in the components.
GraphQL Query: Adjust the query or endpoint in the Apollo Client setup if you need additional data or different functionality.
MUI Components: Customize MUI components through the sx prop or by overriding MUI themes.

## Usage
Search for Cities: Type a city name into the search bar to filter the list of cities.
Sort Columns: Click on column headers (City, Country, Timezone) to sort the data.
View Weather Information: Click or right-click on any row to open a new tab with weather information for that city.

## Links
Deployment Link : https://weather-forecast-j90m.onrender.com/

