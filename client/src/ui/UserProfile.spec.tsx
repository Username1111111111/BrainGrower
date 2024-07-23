import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { setupStore } from '../redux/store';
import UserProfile from './UserProfile';
import i18n from '../i18n';
import { userApi } from '../redux/userApi';
import { activityLogApi } from '../redux/activityLogApi';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { RootState } from '@reduxjs/toolkit/query';

vi.mock('file-saver', () => ({ saveAs: vi.fn() }));

const renderWithProviders = (ui: React.ReactElement, store: Partial<RootState>) => {
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
    </Provider>,
  );
};

describe('UserProfile', () => {
  const userId = 1;

  beforeEach(() => {
    localStorage.setItem('id', '1');
  });

  it('renders loading state correctly', () => {
    const store = setupStore({
      [userApi.reducerPath]: {
        queries: {
          [`fetchUser(${userId})`]: { status: 'pending' },
        },
      },
    });

    renderWithProviders(<UserProfile userId={String(userId)} />, store);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const store = setupStore({
      [userApi.reducerPath]: {
        queries: {
          [`fetchUser(${userId})`]: { status: 'rejected', error: { message: 'Error fetching user' } },
        },
      },
    });

    renderWithProviders(<UserProfile userId={String(userId)} />, store);
    expect(screen.getByText(/error fetching user/i)).toBeInTheDocument();
  });

  it('renders user data correctly', async () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      lastLogin: '2024-01-01T00:00:00.000Z',
      signupDate: '2023-01-01T00:00:00.000Z',
      profileImage: 'http://example.com/profile.jpg',
    };

    const store = setupStore({
      [userApi.reducerPath]: {
        queries: {
          [`fetchUser(${userId})`]: { status: 'fulfilled', data: user },
        },
      },
      [activityLogApi.reducerPath]: {
        queries: {
          [`fetchActivityLogs(${userId})`]: { status: 'fulfilled', data: [] },
        },
      },
    });

    renderWithProviders(<UserProfile userId={String(userId)} />, store);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('04:00 01.01.2024')).toBeInTheDocument();
    expect(screen.getByText('04:00 01.01.2023')).toBeInTheDocument();
    expect(screen.getByAltText('Profile')).toBeInTheDocument();
  });

  it('handles file upload correctly', async () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      lastLogin: '2024-01-01T00:00:00.000Z',
      signupDate: '2023-01-01T00:00:00.000Z',
      profileImage: 'http://example.com/profile.jpg',
    };

    const store = setupStore({
      [userApi.reducerPath]: {
        queries: {
          [`fetchUser(${userId})`]: { status: 'fulfilled', data: user },
        },
      },
      [activityLogApi.reducerPath]: {
        queries: {
          [`fetchActivityLogs(${userId})`]: { status: 'fulfilled', data: [] },
        },
      },
    });

    renderWithProviders(<UserProfile userId={String(userId)} />, store);

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const input = screen.getByLabelText('Choose file');

    fireEvent.change(input, { target: { files: [file] } });

    const uploadButton = screen.getByText(/upload/i);
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText(/uploading/i)).toBeInTheDocument();
    });

    const updateUserImage = store.dispatch(
      userApi.endpoints.updateUserImage.initiate({
        id: user.id,
        formData: new FormData(),
      }),
    );

    await waitFor(() => {
      expect(updateUserImage.status).toBe(undefined);
    });

    await waitFor(() => {
      expect(screen.getByText(/upload/i)).toBeInTheDocument();
    });
  });

  it('renders ExportUserData and ActivityLogList components', () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      lastLogin: '2024-01-01T00:00:00.000Z',
      signupDate: '2023-01-01T00:00:00.000Z',
      profileImage: 'http://example.com/profile.jpg',
    };

    const store = setupStore({
      [userApi.reducerPath]: {
        queries: {
          [`fetchUser(${userId})`]: { status: 'fulfilled', data: user },
        },
      },
      [activityLogApi.reducerPath]: {
        queries: {
          [`fetchActivityLogs(${userId})`]: { status: 'fulfilled', data: [] },
        },
      },
    });

    renderWithProviders(<UserProfile userId={String(userId)} />, store);

    expect(screen.getByText(/export data/i)).toBeInTheDocument();
    expect(screen.getByText('Activity:')).toBeInTheDocument();
  });
});
