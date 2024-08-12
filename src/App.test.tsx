import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import App from './App';

test('Проверка отображения приложения', () => {
  render(<App />);
  expect(screen.getByText(/Приложение TODOS/i)).toBeInTheDocument();
});
