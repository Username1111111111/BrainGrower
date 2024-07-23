import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
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
      data: { data: mockUsers, total: mockUsers.length },
      error: undefined,
      isLoading: false,
      refetch: vi.fn(),
    });
  });

  it('renders user table with correct data', () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <UserTable />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Users (2)')).toBeInTheDocument();

    mockUsers.forEach((user) => {
      const userIdElements = screen.queryAllByRole('link', { name: user.id.toString() });
      expect(userIdElements).toHaveLength(1);
      expect(userIdElements[0]).toBeInTheDocument();

      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });

    const paginationButtons = screen.queryAllByText(/^\d+$/);
    expect(paginationButtons.map((btn) => btn.textContent)).toContain('2');
    expect(screen.getByText('2')).toBeInTheDocument();
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
        <MemoryRouter>
          <UserTable />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('loading...')).toBeInTheDocument();
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
        <MemoryRouter>
          <UserTable />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('errorLoadingUsers')).toBeInTheDocument();
  });
});
