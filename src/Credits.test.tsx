import React from 'react';
import { render, screen } from '@testing-library/react';
import Credits from './Credits';

test('renders Trailers SECTION', () => {
  render(<Credits />);
  const linkElement = screen.getByText(/Trailers/i);
  expect(linkElement).toBeInTheDocument();
});
