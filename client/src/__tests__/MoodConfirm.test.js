import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import MoodConfirm from '../components/MoodConfim'

const mockSubmitFn = jest.fn()
const mockCancelFn = jest.fn()

const mockMood = {
    name: 'Ecstatic',
    color: '#F0F0F0'
}

it('should not display any buttons while awaiting a selection', () => {
    render(<MoodConfirm 
        currentMood={mockMood}
        selectionStatus={'awaiting'}
        submitCallback={mockSubmitFn}
        cancelCallback={mockCancelFn}
    />)

    const buttonElements = screen.queryAllByRole('button')

    expect(buttonElements.length).toBe(0)
})

it('should display a "waiting for input" text when awaiting selection', () => {
    render(<MoodConfirm 
        currentMood={mockMood}
        selectionStatus={'awaiting'}
        submitCallback={mockSubmitFn}
        cancelCallback={mockCancelFn}
    />)

    const textElement = screen.getByText(/You have not selected a mood yet./i)

    expect(textElement).toBeInTheDocument()
})

it('should render the mood name and color when selection is made', () => {
    render(<MoodConfirm 
        currentMood={mockMood}
        selectionStatus={'selected'}
        submitCallback={mockSubmitFn}
        cancelCallback={mockCancelFn}
    />)

    const headingElement = screen.getByText(`You feel ${mockMood.name}`)

    expect(headingElement).toHaveStyle(`background-color: ${mockMood.color}`)
})

it('should render two buttons when selection is made', () => {
    render(<MoodConfirm 
        currentMood={mockMood}
        selectionStatus={'selected'}
        submitCallback={mockSubmitFn}
        cancelCallback={mockCancelFn}
    />)

    const buttonElements = screen.queryAllByRole('button')

    expect(buttonElements.length).toBe(2)
})

it('should call submitCallback once when "Yes" button is clicked', () => {
    render(<MoodConfirm 
        currentMood={mockMood}
        selectionStatus={'selected'}
        submitCallback={mockSubmitFn}
        cancelCallback={mockCancelFn}
    />)

    const yesButtonElement = screen.getByRole('button', { name: 'Yes' })
    fireEvent.click(yesButtonElement)

    expect(mockSubmitFn).toHaveBeenCalled()
})

it('should call cancelCallback once when "No" button is clicked', () => {
    render(<MoodConfirm 
        currentMood={mockMood}
        selectionStatus={'selected'}
        submitCallback={mockSubmitFn}
        cancelCallback={mockCancelFn}
    />)

    const noButtonElement = screen.getByRole('button', { name: 'No' })
    fireEvent.click(noButtonElement)

    expect(mockCancelFn).toHaveBeenCalled()
})

it('should display "saving response" text when selection is made', () => {
    render(<MoodConfirm 
        currentMood={mockMood}
        selectionStatus={'submitted'}
        submitCallback={mockSubmitFn}
        cancelCallback={mockCancelFn}
    />)

    const textElement = screen.getByText(/Saving your response.../i)

    expect(textElement).toBeInTheDocument()
})

it('should display a single button when data submission fails', () => {
    render(<MoodConfirm 
        currentMood={mockMood}
        selectionStatus={'failed'}
        submitCallback={mockSubmitFn}
        cancelCallback={mockCancelFn}
    />)

    const buttonElement = screen.getByRole('button', { name: 'Try again' })

    expect(buttonElement).toBeInTheDocument()
})

it('should display "something went wrong" text when submission failes', () => {
    render(<MoodConfirm 
        currentMood={mockMood}
        selectionStatus={'failed'}
        submitCallback={mockSubmitFn}
        cancelCallback={mockCancelFn}
    />)

    const textElement = screen.getByText(/Oops! It looks like something went wrong./i)

    expect(textElement).toBeInTheDocument()
})

it('should call submitCallback once when "Try again" button is clicked', () => {
    render(<MoodConfirm 
        currentMood={mockMood}
        selectionStatus={'failed'}
        submitCallback={mockSubmitFn}
        cancelCallback={mockCancelFn}
    />)

    const buttonElement = screen.getByRole('button', { name: 'Try again' })
    fireEvent.click(buttonElement)

    expect(mockSubmitFn).toHaveBeenCalled()
})

it('should display "response recorded" text when submission is successful', () => {
    render(<MoodConfirm 
        currentMood={mockMood}
        selectionStatus={'recorded'}
        submitCallback={mockSubmitFn}
        cancelCallback={mockCancelFn}
    />)

    const textElement = screen.getByText(/Thank you! Your response has been recorded/i)

    expect(textElement).toBeInTheDocument()
})