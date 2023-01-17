import { describe, it, expect } from 'vitest';
import {render, screen} from '@testing-library/svelte'

import ControlPanel from './routes/ControlPanel.svelte';

it('should render', () => {
	const element = render(ControlPanel, {})
	expect(() => element.getByText('This is a test')).not.toThrow()
})