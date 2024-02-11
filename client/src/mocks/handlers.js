import { http, HttpResponse } from 'msw'
import { getAPIHost } from '../utils/getAPIHost'

const mockMoods = ['Frustrated', 'Numb', 'Sad']
const host = getAPIHost()

export const mockDates = [
    { year: 2023, month: 9, day: 5 },
    { year: 2022, month: 11, day: 23 },
    { year: 2022, month: 5, day: 13 }
]

const mockTodayResponse = {
    date: {
        year: 2024,
        month: 1,
        day: 10
    },
    totalEntries: 6,
    moods: mockMoods.map(mood => ({name: mood, tally: 2 }))
}

const mockPreviousResponse = mockDates.map(date => ({
    date,
    totalEntries: 6,
    moods: mockMoods.map(mood => ({name: mood, tally: 2 }))
}))

export const handlers = [
    http.get(`${host}/api/moods/today`, () => {
        return HttpResponse.json({ success: true, data: mockTodayResponse })
    }),
    http.get(`${host}/api/moods/previous`, () => {
        return HttpResponse.json({ success: true, data: mockPreviousResponse })
    })   
]