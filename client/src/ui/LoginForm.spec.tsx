import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { setupStore } from '../redux/store';
import LoginForm from './LoginForm';
import { expect, it, describe, vi } from 'vitest';

vi.mock('../redux/userApi', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLoginUserMutation: () => [
      vi.fn().mockResolvedValue({
        access_token: 'test_token',
        role: 'test_role',
        message: 'Login successful!',
      }),
      { isLoading: false, error: null },
    ],
  };
});

const renderComponent = () => {
  const store = setupStore();
  return render(
    <Provider store={store}>
      <Router>
        <LoginForm />
      </Router>
    </Provider>,
  );
};

describe('LoginForm', () => {
  it('renders the login form with initial values', () => {
    renderComponent();

    expect(screen.getByLabelText('Email:')).toHaveValue('');
    expect(screen.getByLabelText('Password:')).toHaveValue('');
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('updates input values on change', () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });

    expect(screen.getByLabelText('Email:')).toHaveValue('test@example.com');
    expect(screen.getByLabelText('Password:')).toHaveValue('password123');
  });
});
