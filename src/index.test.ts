// Annoying errors are appearing here, using this to silence them for time being
// eslint-disable-next-line
// @ts-nocheck
import { describe, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/svelte'
import '@testing-library/jest-dom'

import { EMPTY_DB_RESULTS, NOTIFICATIONS, DB_EVENTS } from './lib/utils/constants';
import { loadDB, clearDB } from './lib/utils/db-init';
import { queryDB } from './lib/utils/tools';
import ControlPanel from './routes/ControlPanel.svelte'

const customerData = [
  { userid: '444', name: 'Bill', email: 'bill@company.com' },
  { userid: '555', name: 'Donna', email: 'donna@home.org' }
];

vi.mock('./lib/utils/db-init', () => {
  return {
    loadDB: vi.fn(), 
    clearDB: vi.fn()
  }
})

vi.mock('./lib/utils/tools', () => {
  return {
    queryDB: vi.fn((callback) => callback(customerData)), 
  }
})

beforeEach(() => {
  vi.useFakeTimers()
})


afterEach(() => {
  vi.restoreAllMocks()
})

describe('app should', () => {
	test('initially render with a message for no rows in DB', () => {
		render(ControlPanel)

		const initialTextElement = screen.queryByText(EMPTY_DB_RESULTS)

		expect(initialTextElement).toBeInTheDocument()
	})

  test('initially render with empty text and three buttons, Enabled Load DB, Enabled Query DB, Disabled Clear DB', () => {
		render(ControlPanel)

    const initialTextElement = screen.queryByText(EMPTY_DB_RESULTS)
		const loadButton = screen.queryByRole('button', {name: 'LoadDB'})
		const queryButton = screen.queryByRole('button', {name: 'QueryDB'})
		const clearButton = screen.queryByRole('button', {name: 'ClearDB'})

    expect(initialTextElement).toBeInTheDocument()
		expect(loadButton).toBeEnabled()
		expect(queryButton).toBeEnabled()
		expect(clearButton).toBeDisabled()

	})

  describe('have button Load DB onClick functionality include', () => {
    test('disables LoadDB, enables Query DB and Clear DB', async () => {
      render(ControlPanel)
      const loadButton = screen.queryByRole('button', {name: 'LoadDB'})
      const queryButton = screen.queryByRole('button', {name: 'QueryDB'})
      const clearButton = screen.queryByRole('button', {name: 'ClearDB'})
  
      await fireEvent.click(loadButton)
      await vi.advanceTimersByTimeAsync(2000)

      expect(loadButton).toBeDisabled()
      expect(queryButton).toBeEnabled()
      expect(clearButton).toBeEnabled()
    })

    test('fires loadDB event', async () => {
      render(ControlPanel)
      const loadButton = screen.queryByRole('button', {name: 'LoadDB'})

      await fireEvent.click(loadButton)
      await vi.advanceTimersByTimeAsync(2000)

      expect(loadDB).toHaveBeenCalledOnce()
    })

    test('causes notifications to render and be logged for load event', async () => {
      render(ControlPanel)
      const loadButton = screen.queryByRole('button', {name: 'LoadDB'})

      await fireEvent.click(loadButton)

      const startNotification = screen.queryByText(NOTIFICATIONS.LOAD_BEGIN)
      expect(startNotification).toBeInTheDocument()

      await vi.advanceTimersByTimeAsync(2000)

      const endNotification = screen.queryByText(NOTIFICATIONS.LOAD_END)
      const newLog = screen.queryByText(DB_EVENTS.LOAD)

      expect(endNotification).toBeInTheDocument()
      expect(newLog).toBeInTheDocument()
    })
  })

  describe('have button Query DB onClick functionality include', () => {
    test('disables LoadDB, enables Query DB and Clear DB', async () => {
      render(ControlPanel)
      const loadButton = screen.queryByRole('button', {name: 'LoadDB'})
      const queryButton = screen.queryByRole('button', {name: 'QueryDB'})
      const clearButton = screen.queryByRole('button', {name: 'ClearDB'})
  
      await fireEvent.click(loadButton)
      await vi.advanceTimersByTimeAsync(2000)

      await fireEvent.click(queryButton)
      await vi.advanceTimersByTimeAsync(2000)

      expect(loadButton).toBeDisabled()
      expect(queryButton).toBeEnabled()
      expect(clearButton).toBeEnabled()
    })

    test('fires queryDB event', async () => {
      render(ControlPanel)
      const queryButton = screen.queryByRole('button', {name: 'QueryDB'})

      await fireEvent.click(queryButton)
      await vi.advanceTimersByTimeAsync(2000)

      expect(queryDB).toHaveBeenCalledOnce()
    })

    test('causes notifications to render and be logged for query event, renders query result', async () => {
      render(ControlPanel)
      const loadButton = screen.queryByRole('button', {name: 'LoadDB'})
      const queryButton = screen.queryByRole('button', {name: 'QueryDB'})

      await fireEvent.click(loadButton)
      await vi.advanceTimersByTimeAsync(2000)

      await fireEvent.click(queryButton)

      const startNotification = screen.queryByText(NOTIFICATIONS.QUERY_BEGIN)
      expect(startNotification).toBeInTheDocument()

      await vi.advanceTimersByTimeAsync(2000)

      const results = screen.queryByTestId('customer-table')
      const endNotification = screen.queryByText(NOTIFICATIONS.QUERY_END)
      const newLog = screen.queryByText(DB_EVENTS.QUERY)

      expect(results?.children.length).toBe(2)
      expect(endNotification).toBeInTheDocument()
      expect(newLog).toBeInTheDocument()
    })
  })

  describe('have button Clear DB onClick functionality include', () => {
    test('disable Clear DB, enables Query DB and Load DB', async () => {
      render(ControlPanel)
      const loadButton = screen.queryByRole('button', {name: 'LoadDB'})
      const queryButton = screen.queryByRole('button', {name: 'QueryDB'})
      const clearButton = screen.queryByRole('button', {name: 'ClearDB'})
  
      await fireEvent.click(loadButton)
      await vi.advanceTimersByTimeAsync(2000)

      expect(loadButton).toBeDisabled()
      expect(queryButton).toBeEnabled()
      expect(clearButton).toBeEnabled()

      await fireEvent.click(clearButton)
      await vi.advanceTimersByTimeAsync(2000)

      expect(loadButton).toBeEnabled()
      expect(queryButton).toBeEnabled()
      expect(clearButton).toBeDisabled()
    })

    test('fires clearDB event', async () => {
      render(ControlPanel)
      const loadButton = screen.queryByRole('button', {name: 'LoadDB'})
      const clearButton = screen.queryByRole('button', {name: 'ClearDB'})

      await fireEvent.click(loadButton)
      await vi.advanceTimersByTimeAsync(2000)

      await fireEvent.click(clearButton)
      await vi.advanceTimersByTimeAsync(2000)

      expect(clearDB).toHaveBeenCalledOnce()
    })

    test('causes notifications to render and be logged for clear event and clears results', async () => {
      render(ControlPanel)
      const loadButton = screen.queryByRole('button', {name: 'LoadDB'})
      const queryButton = screen.queryByRole('button', {name: 'QueryDB'})
      const clearButton = screen.queryByRole('button', {name: 'ClearDB'})

      await fireEvent.click(loadButton)
      await vi.advanceTimersByTimeAsync(2000)

      await fireEvent.click(queryButton)
      await vi.advanceTimersByTimeAsync(2000)

      const results = screen.queryByTestId('customer-table')
      expect(results?.children.length).toBe(2)

      await fireEvent.click(clearButton)

      const startNotification = screen.queryByText(NOTIFICATIONS.CLEAR_BEGIN)
      expect(startNotification).toBeInTheDocument()

      await vi.advanceTimersByTimeAsync(2000)

      const endNotification = screen.queryByText(NOTIFICATIONS.CLEAR_END)
      const newLog = screen.queryByText(DB_EVENTS.CLEAR)
      const emptyResults = screen.queryByText(EMPTY_DB_RESULTS)

      expect(endNotification).toBeInTheDocument()
      expect(newLog).toBeInTheDocument()
      expect(emptyResults).toBeInTheDocument()
    })
  })
})

