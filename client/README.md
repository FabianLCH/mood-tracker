# Mood Tracker | Client

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

For setup instructions, refer to the project's main [README](../README.md).

## Components

### `Pie`

The app's main component. Its purpose is to initialize the `<canvas>` element where the pie chart will be drawn using a set of configuration options defined in `./src/utils/pieConfigOptions.js`.

The component accepts a single `slices` prop, which is expected to be a list of `<Shape>` objects representing the slices of the pie chart.

## Views

The app has two main views:

### `MoodPieContainer`

**Route:** `/`

This is where users can anonymously share how they are currently feeling. It features an interactive pie chart with draggable slices that users are able to click to select the mood that best identifies how they currently feel. When a user selects a slice, a sound effect will play.

### `MoodBarChartContainer`

**Route:** `/statistics`

This is where users can view the cumulative data submitted by themselves and other users for a given date. The view features an interactive bar chart that reads from the database and updates its display within a set interval.

Users are able to choose whether they wish to view the data for the current date or for one of the previous six dates for which data has been recorded.

## Credits

- [Purty Wood Pattern](https://www.toptal.com/designers/subtlepatterns/purty-wood/) - Made by Richard Tabor
- [Tactile Noise Pattern](https://www.toptal.com/designers/subtlepatterns/tactile-noise/) - Made by Atle Mo
- Bubble Pop Sound Effect - Obtained from Pixabay