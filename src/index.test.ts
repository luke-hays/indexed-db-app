import { describe, it, expect } from 'vitest';
import {render, screen} from '@testing-library/svelte'

import ControlPanel from './routes/ControlPanel.svelte';

it('should render', () => {
	const element = render(ControlPanel, {})
	expect(() => element.getByText('This is a test')).not.toThrow()
})

describe('app should', () => {
  it('initially render three buttons, Enabled Load DB, Enabled Query DB, Disabled Clear DB')
  it('initially render with a message for no rows in DB')

  describe('have button Load DB onClick functionality include', () => {
    it('disables LoadDB, enables Query DB and Clear DB')
    it('fires loadDB event')
    it('causes notifications to render and be logged for load event')
  })

  describe('have button Query DB onClick functionality include', () => {
    it('disables LoadDB, enables Query DB and Clear DB')
    it('fires queryDB event')
    it('causes notifications to render and be logged for query event')
		it('render text to query results with fields, including name, email, date last order, total sales')
  })

  describe('have button Clear DB onClick functionality include', () => {
    it('disable Clear DB, enables Query DB and Load DB')
    it('fires clearDB event')
    it('causes notifications to render and be logged for clear event')
    it('should remove text from query area after event')
  })

})

