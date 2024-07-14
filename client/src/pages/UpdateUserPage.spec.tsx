import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UpdateUserPage from './UpdateUserPage';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import store from '../redux/store';

const mockLocalStorage = {
  getItem: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('UpdateUserPage', () => {
  it('does not render UpdateUserForm and UserTable inside Page component if role is not admin or token does not exist', () => {
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify({ role: 'user', token: '' }));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UpdateUserPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByLabelText('Name:')).toBeNull();
    expect(screen.queryByLabelText('Email:')).toBeNull();
    expect(screen.queryByText('Users')).toBeNull();
  });
});
