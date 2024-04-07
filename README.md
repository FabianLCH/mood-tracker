# Mood Tracker

The `Mood Tracker` is a full-stack web application where users can anonymously share how they feel on a given day and discover how others are feeling through interactive graphs and charts.

The app is built using the MERN (MongoDB, Express.js, React, Node.js) stack, and its database is hosted on MondoDB Cloud.

Interested in seeing the project running? [View it here!](https://mood-tracker-azz1.onrender.com)

**NOTE:** The app may take some time to start.

## Components

The app consists of two main parts:
- [Client](./client/)
- [Server](./server/)

## Setup

Clone this repository by running the following command:

```
git clone https://github.com/FabianLCH/mood-tracker.git
```

Run the `install-packages` script to install the client and server npm packages:

```
npm run install-packages
```

Go into the `client/` folder and create a `.env` file containing the following environment variable

```
REACT_APP_DEV_API_HOST=
```

| Variable | Description | Example |
| --- | --- | --- |
| REACT_APP_DEV_API_HOST | The URL of the server hosting the API. This variable will only be used in development, where the client and server are run separately. | `http://localhost:9000`

Next, go into the `server/` folder and create an `.env` file containing the following variables:

```
CONNECTION_STRING=
PORT=
```

| Variable | Description | Example |
| --- | --- | --- |
| CONNECTION_STRING | Your MongoDB connection string. | For MongoDB Cloud, see [Get Connection String](https://www.mongodb.com/docs/guides/atlas/connection-string/). |
| PORT | The port the server will run on. | `9000`

Finally, return to the project root folder and run the `dev` script:

```
npm run dev
```

## Create a production build

To create a production build of the app, run the `build` script.

```
npm run build
```

This will create a build of the client and copy its files to the **server** folder.

Then, run the `start` script to run the app.

```
npm start
```
