import {render, screen, fireEvent, within} from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import Todos from './Todos';


test('Проверка добавления задачи', () => {
  render(<Todos />);

  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Тестовая задача' } });
  fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter', code: 'Enter', charCode: 13 });

  expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
  expect(screen.getByText(/Осталось: 1/i)).toBeInTheDocument();
});

test('Проверка переключения чекбокса', () => {
  render(<Todos />);

  fireEvent.change(screen.getByPlaceholderText(/Добавьте задачу/i), { target: { value: 'Тестовая задача' } });
  fireEvent.keyDown(screen.getByPlaceholderText(/Добавьте задачу/i), { key: 'Enter', code: 'Enter' });

  const listItem = screen.getByText('Тестовая задача').closest('li');
  const checkbox = within(listItem as HTMLLIElement).getByRole('checkbox');
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

test('Проверка изменения счетчика задач', () => {
  render(<Todos />);

  fireEvent.change(screen.getByPlaceholderText(/Добавьте задачу/i), { target: { value: 'Тестовая задача' } });
  fireEvent.keyDown(screen.getByPlaceholderText(/Добавьте задачу/i), { key: 'Enter', code: 'Enter' });

  fireEvent.change(screen.getByPlaceholderText(/Добавьте задачу/i), { target: { value: 'Тестовая задача 2' } });
  fireEvent.keyDown(screen.getByPlaceholderText(/Добавьте задачу/i), { key: 'Enter', code: 'Enter' });

  const listItem = screen.getByText('Тестовая задача').closest('li');
  const checkbox = within(listItem as HTMLLIElement).getByRole('checkbox');

  fireEvent.click(checkbox);

  expect(screen.getByText(/Осталось: 1/i)).toBeInTheDocument();
});

test('Проверка удаления', () => {
  render(<Todos />);

  fireEvent.change(screen.getByPlaceholderText(/Добавьте задачу/i), { target: { value: 'Тестовая задача' } });
  fireEvent.keyDown(screen.getByPlaceholderText(/Добавьте задачу/i), { key: 'Enter', code: 'Enter' });

  fireEvent.change(screen.getByPlaceholderText(/Добавьте задачу/i), { target: { value: 'Тестовая задача 2' } });
  fireEvent.keyDown(screen.getByPlaceholderText(/Добавьте задачу/i), { key: 'Enter', code: 'Enter' });

  const listItem = screen.getByText('Тестовая задача');
  const listItemContainer = listItem.closest('li');

  const checkbox = within(listItemContainer as HTMLLIElement).getByRole('checkbox');

  fireEvent.click(checkbox);

  fireEvent.click(screen.getByText(/Удалить/i));

  expect(screen.queryByText('Тестовая задача')).not.toBeInTheDocument();
  expect(screen.getByText('Тестовая задача 2')).toBeInTheDocument();
});

