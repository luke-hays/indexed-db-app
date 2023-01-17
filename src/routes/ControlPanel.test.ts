import { describe, it, expect } from 'vitest';

describe('control panel should', () => {
  it('initially render three buttons, Enabled Load DB, Enabled Query DB, Disabled Clear DB')
  it('initially render with a message for no rows in DB')

  describe('have button Load DB onClick functionality include', () => {
    it('onClick disables LoadDB, enables Query DB and Clear DB')
    it('onClick fires loadDB event')
    it('onClick causes notifications to render and be logged for load event')
  })

  describe('have button Query DB onClick functionality include', () => {
    it('onClick disables LoadDB, enables Query DB and Clear DB')
    it('onClick fires queryDB event')
    it('onClick causes notifications to render and be logged for query event')
    it('should add text to query area after event')
  })

  describe('have button Clear DB onClick functionality include', () => {
    it('disable Clear DB, enables Query DB and Load DB')
    it('fires clearDB event')
    it('causes notifications to render and be logged for clear event')
    it('should remove text from query area after event')
  })
})

