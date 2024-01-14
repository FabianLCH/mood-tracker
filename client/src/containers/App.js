import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

import MoodPieContainer from "./MoodPieContainer";
import MoodBarChartContainer from "./MoodBarChartContainer";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MoodPieContainer />} />
                <Route path="/statistics" element={<MoodBarChartContainer />}/>
            </Routes>
        </Router>
    );
}

export default App;