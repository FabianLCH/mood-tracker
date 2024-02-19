import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'core-js/stable/structured-clone'

import '../jest.polyfills'

import { 
    Routes,
    Route,
    MemoryRouter
} from 'react-router-dom'

import { setupServer } from 'msw/node'

import { handlers, mockDates } from '../mocks/handlers'

// mock <Bar> component which depends on unavailable library
jest.mock('react-chartjs-2', () => ({
    Bar: () => (<></>)
}))

import MoodBarChartContainer from '../containers/MoodBarChartContainer'


const MockMoodBarChart = () => (
    <MemoryRouter initialEntries={['/statistics']}>
        <Routes>
            <Route path="/" element={() => (<></>)} />
            <Route path="/statistics" element={<MoodBarChartContainer />} />
        </Routes>
    </MemoryRouter>
)

const server = setupServer(...handlers)

beforeAll(() => { server.listen() })

afterEach(() => { server.resetHandlers() })

afterAll(() => { server.close() })

it('should render link back to root view', async () => {
    render(<MockMoodBarChart />)

    const linkElement = await screen.findByRole('link', { name: /Back to mood pie/i })

    expect(linkElement).toHaveAttribute('href', '/')
})

it('should render "fetching data" text on initial render', async () => {
    render(<MockMoodBarChart />)
    
    const textElement = await screen.findByText('Getting data from database...')

    expect(textElement).toBeInTheDocument()
})

it('should render date <select> with "Today" initial value', async () => {
    render(<MockMoodBarChart />)

    const selectElement = await screen.findByRole('combobox')

    expect(selectElement.value).toBe('-1')
})

it('should render "How is everyone else feeling?" when "Today" is selected', async () => {
    render(<MockMoodBarChart />)

    const spanElement = await screen.findByText(/How is everyone else feeling\?/i)

    expect(spanElement).toBeInTheDocument()
})

it('should render "How did everyone else feel?" when date is set to the past', async () => {
    render(<MockMoodBarChart />)

    const selectElement = await screen.findByRole('combobox')
    fireEvent.change(selectElement, { target: { value: 0 } })

    const spanElement = await screen.findByText(/How did everyone else feel\?/i)

    expect(spanElement).toBeInTheDocument()
})

it('should render date select with the # of values returned by API plus "Today"', async () => {
    render(<MockMoodBarChart />)

    const selectElement = await screen.findByRole('combobox')
    fireEvent.change(selectElement)

    expect(selectElement.options.length).toBe(mockDates.length + 1)
})