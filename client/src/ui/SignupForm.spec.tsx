import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { setupStore } from '../redux/store';
import SignupForm from './SignupForm';
import { it, describe, expect } from 'vitest';

describe('SignupForm', () => {
  it('renders the signup form with initial values', () => {
    render(
      <Provider store={setupStore()}>
        <Router>
          <SignupForm />
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText('Name:')).toHaveValue('');
    expect(screen.getByLabelText('Email:')).toHaveValue('');
    expect(screen.getByLabelText('Password:')).toHaveValue('');
    expect(screen.getByLabelText('Confirm password:')).toHaveValue('');
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  // it('updates input values on change', () => {
  //   render(
  //     <Provider store={setupStore()}>
  //       <Router>
  //         <SignupForm />
  //       </Router>
  //     </Provider>
  //   );

  //   const nameInput = screen.getByLabelText('Name:');
  //   const emailInput = screen.getByLabelText('Email:');
  //   const passwordInput = screen.getByLabelText('Password:');
  //   const confirmPasswordInput = screen.getByLabelText('Confirm password:');

  //   userEvent.type(nameInput, 'John Doe');
  //   userEvent.type(emailInput, 'john.doe@example.com');
  //   userEvent.type(passwordInput, 'password123');
  //   userEvent.type(confirmPasswordInput, 'password123');

  //   expect(nameInput).toHaveValue('John Doe');
  //   expect(emailInput).toHaveValue('john.doe@example.com');
  //   expect(passwordInput).toHaveValue('password123');
  //   expect(confirmPasswordInput).toHaveValue('password123');
  // });

  it('displays error message on password mismatch', async () => {
    render(
      <Provider store={setupStore()}>
        <Router>
          <SignupForm />
        </Router>
      </Provider>,
    );

    const passwordInput = screen.getByLabelText('Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm password:');
    const submitButton = screen.getByRole('button', { name: /create/i });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  it('handles signup process correctly', async () => {
    render(
      <Provider store={setupStore()}>
        <Router>
          <SignupForm />
        </Router>
      </Provider>,
    );

    const nameInput = screen.getByLabelText('Name:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm password:');
    const submitButton = screen.getByRole('button', { name: /create/i });

    userEvent.type(nameInput, 'John Doe');
    userEvent.type(emailInput, 'john.doe@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.type(confirmPasswordInput, 'password123');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('Passwords do not match')).not.toBeInTheDocument();
    });

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(confirmPasswordInput).toHaveValue('');
  });
});
