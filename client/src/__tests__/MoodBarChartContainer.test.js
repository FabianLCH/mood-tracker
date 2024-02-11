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

it('should render "fetching data" text on initial render', async () => {
    render(<MockMoodBarChart />)
    
    const textElement = await screen.findByText('Getting data from database...')

    expect(textElement).toBeInTheDocument()
})