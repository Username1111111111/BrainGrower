import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../redux/store';
import { userApi } from '../redux/userApi';
import UserTable from './UserTable';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('UserTable', () => {
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  ];

  beforeEach(() => {
    userApi.useFetchUsersQuery = vi.fn().mockReturnValue({
      data: mockUsers,
      error: undefined,
      isLoading: false,
      refetch: vi.fn(),
    });
  });

  it('renders user table with correct data', () => {
    render(
      <Provider store={setupStore()}>
        <UserTable />
      </Provider>,
    );

    expect(screen.getByText('Users')).toBeInTheDocument();

    mockUsers.forEach((user) => {
      expect(screen.getByText(user.id.toString())).toBeInTheDocument();
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });

  it('displays loading state while fetching users', () => {
    userApi.useFetchUsersQuery = vi.fn().mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      refetch: vi.fn(),
    });

    render(
      <Provider store={setupStore()}>
        <UserTable />
      </Provider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when fetch users fails', () => {
    const errorMessage = 'Error fetching users';

    userApi.useFetchUsersQuery = vi.fn().mockReturnValue({
      data: undefined,
      error: { message: errorMessage },
      isLoading: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={setupStore()}>
        <UserTable />
      </Provider>,
    );

    expect(screen.getByText(`Error fetching users`)).toBeInTheDocument();
  });
});
