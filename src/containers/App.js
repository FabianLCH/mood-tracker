import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import MoodPieContainer from "./MoodPieContainer";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <MoodPieContainer />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;