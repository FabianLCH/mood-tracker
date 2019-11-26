import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import MoodPieContainer from "./MoodPieContainer";
import MoodBarChartContainer from "./MoodBarChartContainer";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" >
                    <MoodPieContainer />
                </Route>
                <Route path="/statistics">
                    <MoodBarChartContainer />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;