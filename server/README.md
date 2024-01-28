# Mood Tracker | Server

The Express.js server that serves the React app and provides an API for interactions with the app's MongoDB Cloud database.

## Setup

For setup instructions, refer to the project's main [README](../README.md).


## React App

The app is served at the server's root (`/`). Any requests made to routes not recognized by the server are directed to the React app, which utilizes client-side routing to generate different views.

## API

### Routes

The API provides several endpoints for the app to interact with the database:

#### Get today's mood data

`GET /api/moods/today`

Returns a [Tally](#tally) document containing tally counts for each mood for the current date. If no data exists for the current date, creates a new document with empty counts on the database and returns it.

___

#### Increment the count for a specified mood

`POST /api/moods/today`

Increments the tally count for a specified mood for the current date.

**Request Body:**

| Key | Type | Description | Example |
| --- | ---- | ----------- | ------- |
| mood | string | The name of the mood to increment the current tally count for. | `Surprised` |

___

#### Get mood data for previous dates

`GET /api/moods/previous`

Returns a list of [Tally](#tally) documents containing mood tally counts for the six latest available entries before the current date's entry.

### Schemas

#### Tally

The main document schema used to store mood tally counts for a specific date.

```javascript
{
    date: {
        year: Number,
        month: Number,
        day: Number
    },
    totalEntries: Number,
    moods: [
        {
            name: String,
            tally: Number
        }
    ]
}
```