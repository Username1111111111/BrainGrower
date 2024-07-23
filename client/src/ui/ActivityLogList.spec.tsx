import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ActivityLogList } from './ActivityLogList';
import { setupStore } from '../redux/store';
import i18n from '../i18n';
import { activityLogApi } from '../redux/activityLogApi';
import { describe, it, expect } from 'vitest';
import { RootState } from '@reduxjs/toolkit/query';

const renderWithProviders = (ui: React.ReactElement, store: Partial<RootState>) => {
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
    </Provider>,
  );
};

describe('ActivityLogList', () => {
  it('displays loading state initially', () => {
    const store = setupStore({
      [activityLogApi.reducerPath]: {
        queries: {
          'fetchActivityLogs(undefined)': {
            status: 'pending',
          },
        },
      },
    });

    renderWithProviders(<ActivityLogList userId={1} />, store);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays error state on fetch failure', async () => {
    const store = setupStore({
      [activityLogApi.reducerPath]: {
        queries: {
          'fetchActivityLogs(undefined)': {
            status: 'rejected',
            error: { message: 'Error fetching logs' },
          },
        },
      },
    });

    renderWithProviders(<ActivityLogList userId={1} />, store);
    await waitFor(() => {
      expect(screen.getByText(/error fetching logs/i)).toBeInTheDocument();
    });
  });
});
