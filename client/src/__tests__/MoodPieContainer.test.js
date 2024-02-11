import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { 
    BrowserRouter as Router, 
    Routes, 
    Route 
} from "react-router-dom"

jest.mock('react-konva', () => ({
    Shape: () => (<div></div>)
}))

jest.mock('../components/Pie', () => jest.fn())

import MoodPieContainer from '../containers/MoodPieContainer'

const MockMoodPie = () => (
    <Router>
        <Routes>
            <Route path="/" element={<MoodPieContainer />} />
            <Route path="/statistics" element={<></>} />
        </Routes>
    </Router>
)

it('should have "Neutral" set as the initial mood', () => {
    render(<MockMoodPie />)

    const currentMoodElement = screen.getByText(/You feel Neutral/i)

    expect(currentMoodElement).toBeInTheDocument()
})

it('should display "no mood selected" text', () => {
    render(<MockMoodPie />)

    const noMoodSelectedElement = screen.getByText(/You have not selected a mood yet./i)

    expect(noMoodSelectedElement).toBeInTheDocument()
})

it('should display a valid "Go to Statistics" link', () => {
    render(<MockMoodPie />)

    const linkElement = screen.getByRole('link')

    expect(linkElement).toHaveAttribute('href', '/statistics')
})

it('should take user to statistics page when link is clicked', () => {
    render(<MockMoodPie />)

    const linkElement = screen.getByRole('link')
    fireEvent.click(linkElement)

    expect(window.location.pathname).toBe('/statistics')
})