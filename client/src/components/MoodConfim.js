import React from "react"

const statusMessages = {
    "awaiting": "You have not selected a mood yet.",
    "submitted": "Saving your response...",
    "failed": "Oops! It looks like something went wrong.",
    "recorded": "Thank you! Your response has been recorded"
}

const MoodConfirm = ({ currentMood, selectionStatus, submitCallback, cancelCallback }) => (
    <>
        <h3 className="current-feeling" style={{backgroundColor: currentMood.color}}>You feel {currentMood.name}</h3>
        { selectionStatus === "selected" ? 
            (
                <div className="entry-message">
                    <span className="confirm-message">Is this correct?</span> 
                    <button className="pie-button" onClick={submitCallback}>Yes</button> 
                    <button className="pie-button" onClick={cancelCallback}>No</button>
                </div>
            ) :
            (
                <div className="entry-message">
                    { statusMessages[selectionStatus] }
                    { selectionStatus === "failed" && <button className="pie-button" onClick={submitCallback}>Try again</button> }
                </div>
            )
        }
    </>
)

export default MoodConfirm