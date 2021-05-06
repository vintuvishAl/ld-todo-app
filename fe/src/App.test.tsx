import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import App from './App'

test('check if create todo popup displays', () => {
  render(<App />);
  const addTodo = screen.getByTestId('add-todo')
  fireEvent.click(addTodo)
  expect(screen.getByText('Create new To-Do')).toBeInTheDocument()
  const nameInput = screen.getByTestId('input-name').querySelector('input')
  const nameInputText = screen.getByTestId('input-name').querySelector('label')
  const submitAddTodo = screen.getByTestId('submit-todo')
  expect(nameInput).toHaveValue('')
  expect(nameInputText).toHaveTextContent('Name To-Do*')
  expect(submitAddTodo).toBeInTheDocument()
});


test('check if empty todo name gives error on create todo', () => {
  render(<App />);
  const addTodo = screen.getByTestId('add-todo')
  fireEvent.click(addTodo);
  expect(screen.getByText('Create new To-Do')).toBeInTheDocument()
  const nameInput = screen.getByTestId('input-name').querySelector('input')
  const nameInputText = screen.getByTestId('input-name').querySelector('label')
  const submitAddTodo = screen.getByTestId('submit-todo')
  expect(nameInput).toHaveValue('')
  expect(submitAddTodo).toBeInTheDocument()
  fireEvent.change(nameInput, { target: { value: '' } })
  fireEvent.click(submitAddTodo);
  expect(screen.getByText('Name To-Do is requried')).toBeInTheDocument()
});

