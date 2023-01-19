import { describe, expect, vi } from 'vitest';
import {render, fireEvent, screen} from '@testing-library/svelte'
import '@testing-library/jest-dom'

import { EMPTY_DB_RESULTS, NOTIFICATIONS, DB_EVENTS } from '$lib/utils/constants';
import { loadDB, clearDB } from '$lib/utils/db-init';
import { queryDB } from '$lib/utils/tools';
import ControlPanel from './routes/ControlPanel.svelte';

describe('app should', () => {
	test('initially render with a message for no rows in DB', () => {
		const panel = render(ControlPanel, {})

		const initialTextElement = panel.queryByText(EMPTY_DB_RESULTS)

		expect(initialTextElement).toBeInTheDocument()
	})

  test('initially render with empty text and three buttons, Enabled Load DB, Enabled Query DB, Disabled Clear DB', () => {
		const panel = render(ControlPanel, {})

    const initialTextElement = panel.queryByText(EMPTY_DB_RESULTS)
		const loadButton = panel.queryByRole('button', {name: 'LoadDB'})
		const queryButton = panel.queryByRole('button', {name: 'QueryDB'})
		const clearButton = panel.queryByRole('button', {name: 'ClearDB'})

    expect(initialTextElement).toBeInTheDocument()
		expect(loadButton).toBeEnabled()
		expect(queryButton).toBeEnabled()
		expect(clearButton).toBeDisabled()

	})

  describe('have button Load DB onClick functionality include', () => {
    test('disables LoadDB, enables Query DB and Clear DB', async () => {
      const panel = render(ControlPanel, {})
      const loadButton = panel.queryByRole('button', {name: 'LoadDB'})
      const queryButton = panel.queryByRole('button', {name: 'QueryDB'})
      const clearButton = panel.queryByRole('button', {name: 'ClearDB'})
  
      await fireEvent.click(loadButton)

      expect(loadButton).toBeDisabled()
      expect(queryButton).toBeEnabled()
      expect(clearButton).toBeEnabled()
    })

    test('fires loadDB event', async () => {
      const spy = vi.spyOn('$lib/utils/db-init', loadDB)
      const panel = render(ControlPanel, {})
      const loadButton = panel.queryByRole('button', {name: 'LoadDB'})

      await fireEvent.click(loadButton)

      expect(spy).toHaveBeenCalledOnce()
    })

    test('causes notifications to render and be logged for load event', async () => {
      const panel = render(ControlPanel, {})
      const loadButton = panel.queryByRole('button', {name: 'LoadDB'})

      await fireEvent.click(loadButton)

      const startNotification = panel.queryByText(NOTIFICATIONS.LOAD_BEGIN)
      const endNotification = panel.queryByText(NOTIFICATIONS.LOAD_END)
      const newLog = panel.queryAllByText(DB_EVENTS.LOAD)

      expect(startNotification).toBeInTheDocument()
      expect(endNotification).toBeInTheDocument()
      expect(newLog).toBeInTheDocument()
    })
  })

  describe('have button Query DB onClick functionality include', () => {
    test('disables LoadDB, enables Query DB and Clear DB', async () => {
      const panel = render(ControlPanel, {})
      const loadButton = panel.queryByRole('button', {name: 'LoadDB'})
      const queryButton = panel.queryByRole('button', {name: 'QueryDB'})
      const clearButton = panel.queryByRole('button', {name: 'ClearDB'})
  
      await fireEvent.click(queryButton)

      expect(loadButton).toBeDisabled()
      expect(queryButton).toBeEnabled()
      expect(clearButton).toBeEnabled()
    })

    test('fires queryDB event', async () => {
      const spy = vi.spyOn('$lib/utils/tools', queryDB)
      const panel = render(ControlPanel, {})
      const queryButton = panel.queryByRole('button', {name: 'QueryDB'})

      await fireEvent.click(queryButton)

      expect(spy).toHaveBeenCalledOnce()
    })

    test('causes notifications to render and be logged for query event, renders query result', async () => {
      const panel = render(ControlPanel, {})
      const loadButton = panel.queryByRole('button', {name: 'LoadDB'})
      const queryButton = panel.queryByRole('button', {name: 'QueryDB'})

      await fireEvent.click(loadButton)
      await fireEvent.click(queryButton)

      const startNotification = panel.queryByText(NOTIFICATIONS.QUERY_BEGIN)
      const endNotification = panel.queryByText(NOTIFICATIONS.QUERY_END)
      const newLog = panel.queryByText(DB_EVENTS.QUERY)
      const results = panel.queryByTestId('customer-table')

      expect(startNotification).toBeInTheDocument()
      expect(endNotification).toBeInTheDocument()
      expect(newLog).toBeInTheDocument()
      expect(results?.children.length).toBe(2)
    })
  })

  describe('have button Clear DB onClick functionality include', () => {
    test('disable Clear DB, enables Query DB and Load DB', async () => {
      const panel = render(ControlPanel, {})
      const loadButton = panel.queryByRole('button', {name: 'LoadDB'})
      const queryButton = panel.queryByRole('button', {name: 'QueryDB'})
      const clearButton = panel.queryByRole('button', {name: 'ClearDB'})
  
      await fireEvent.click(loadButton)

      expect(loadButton).toBeDisabled()
      expect(queryButton).toBeEnabled()
      expect(clearButton).toBeEnabled()

      await fireEvent.click(clearButton)

      expect(loadButton).toBeEnabled()
      expect(queryButton).toBeEnabled()
      expect(clearButton).toBeDisabled()
    })

    test('fires clearDB event', async () => {
      const spy = vi.spyOn('$lib/utils/db-init', clearDB)

      const panel = render(ControlPanel, {})
      const loadButton = panel.queryByRole('button', {name: 'LoadDB'})
      const clearButton = panel.queryByRole('button', {name: 'ClearDB'})

      await fireEvent.click(loadButton)
      await fireEvent.click(clearButton)

      expect(spy).toHaveBeenCalledOnce()
    })

    test('causes notifications to render and be logged for clear event and clears results', async () => {
      const panel = render(ControlPanel, {})
      const loadButton = panel.queryByRole('button', {name: 'LoadDB'})
      const queryButton = panel.queryByRole('button', {name: 'QueryDB'})
      const clearButton = panel.queryByRole('button', {name: 'ClearDB'})

      await fireEvent.click(loadButton)
      await fireEvent.click(queryButton)

      const results = panel.queryByTestId('customer-table')

      expect(results?.children.length).toBe(2)

      await fireEvent.click(clearButton)

      const startNotification = panel.queryByText(NOTIFICATIONS.CLEAR_BEGIN)
      const endNotification = panel.queryByText(NOTIFICATIONS.CLEAR_END)
      const newLog = panel.queryByText(DB_EVENTS.CLEAR)
      const emptyResults = panel.queryByText(EMPTY_DB_RESULTS)

      expect(startNotification).toBeInTheDocument()
      expect(endNotification).toBeInTheDocument()
      expect(newLog).toBeInTheDocument()
      expect(emptyResults).toBeInTheDocument()
    })
  })
})

