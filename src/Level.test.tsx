import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppWrapper from './AppWrapper';
import { MemoryRouter } from 'react-router-dom';
import { useLevelData, startDate } from 'useLevelData';
import formatDate from 'formatBatchName';

test('can show level codes', () => {
  const levelData = useLevelData()
  render(<MemoryRouter><AppWrapper /></MemoryRouter>);
  fireEvent.click(screen.getByText(/To the levels/i));
  fireEvent.click(screen.getByText(formatDate(startDate)));
  const [level] = levelData.levels(1)
  fireEvent.click(screen.getByText(level.levelName));
  const levelCode = screen.getByText(level.levelCode.toUpperCase());
  expect(levelCode).toBeInTheDocument();
});


test('can show maker ids', () => {
  const levelData = useLevelData()
  render(<MemoryRouter><AppWrapper /></MemoryRouter>);
  const [level] = levelData.levels(1)
  fireEvent.click(screen.getByText(level.levelName));
  const makerId = screen.getByText(level.makerId.toUpperCase());
  expect(makerId).toBeInTheDocument();
});