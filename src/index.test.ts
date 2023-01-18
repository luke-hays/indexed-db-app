import { describe, expect } from 'vitest';
import {render, screen} from '@testing-library/svelte'
import '@testing-library/jest-dom'

import { EMPTY_DB_RESULTS } from './lib/utils/constants';
import ControlPanel from './routes/ControlPanel.svelte';

describe('app should', () => {
	test('initially render with a message for no rows in DB', () => {
		const panel = render(ControlPanel, {})

		const initialTextElement =  panel.getByText(EMPTY_DB_RESULTS)

		expect(initialTextElement).toBeDefined()
	})

  test('initially render three buttons, Enabled Load DB, Enabled Query DB, Disabled Clear DB', () => {
		const panel = render(ControlPanel, {})

		const loadButton = panel.getByRole('button', {name: 'LoadDB'})
		const queryButton = panel.getByRole('button', {name: 'QueryDB'})
		const clearButton = panel.getByRole('button', {name: 'ClearDB'})

		expect(loadButton).toBeEnabled()
		expect(queryButton).toBeEnabled()
		expect(clearButton).toBeDisabled()
	})

  // describe('have button Load DB onClick functionality include', () => {
  //   test('disables LoadDB, enables Query DB and Clear DB')
  //   test('fires loadDB event')
  //   test('causes notifications to render and be logged for load event')
  // })

  // describe('have button Query DB onClick functionality include', () => {
  //   test('disables LoadDB, enables Query DB and Clear DB')
  //   test('fires queryDB event')
  //   test('causes notifications to render and be logged for query event')
	// 	test('render text to query results with fields, including name, email, date last order, total sales')
  // })

  // describe('have button Clear DB onClick functionality include', () => {
  //   test('disable Clear DB, enables Query DB and Load DB')
  //   test('fires clearDB event')
  //   test('causes notifications to render and be logged for clear event')
  //   test('should remove text from query area after event')
  // })

})

