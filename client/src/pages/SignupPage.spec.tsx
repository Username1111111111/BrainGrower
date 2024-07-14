import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignupPage from './SignupPage';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { expect, describe, it, vi } from 'vitest';

describe('SignupPage', () => {
  it('renders SignupForm inside Page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignupPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password:')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('redirects to home when token is present', () => {
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue('mockToken'),
      removeItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/signup']}>
          <SignupPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(window.location.pathname).toBe('/');
  });

  it('renders SignupPage without redirect when token is not present', () => {
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(null),
      removeItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/signup']}>
          <SignupPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password:')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });
});
