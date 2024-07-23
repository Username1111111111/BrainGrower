import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { setupStore } from '../redux/store';
import ExportUserData from './ExportUserData';
import i18n from '../i18n';
import { exportUserApi } from '../redux/exportUserApi';
import { vi, describe, it, expect } from 'vitest';
import { RootState } from '@reduxjs/toolkit/query';

vi.mock('file-saver', () => ({ saveAs: vi.fn() }));

const renderWithProviders = (ui: React.ReactElement, store: Partial<RootState>) => {
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
    </Provider>,
  );
};

describe('ExportUserData', () => {
  const userId = 1;

  it('renders correctly and has initial state', () => {
    const store = setupStore({});
    renderWithProviders(<ExportUserData userId={userId} />, store);
    expect(screen.getByLabelText(/json/i)).toBeChecked();
    expect(screen.getByLabelText(/csv/i)).not.toBeChecked();
  });

  it('allows user to change export format', () => {
    const store = setupStore({});
    renderWithProviders(<ExportUserData userId={userId} />, store);

    const jsonRadio = screen.getByLabelText(/json/i);
    const csvRadio = screen.getByLabelText(/csv/i);

    fireEvent.click(csvRadio);
    expect(csvRadio).toBeChecked();
    expect(jsonRadio).not.toBeChecked();
  });

  it('handles export errors gracefully', async () => {
    console.error = vi.fn();

    const store = setupStore({
      [exportUserApi.reducerPath]: {
        mutations: {
          'exportUserData(undefined)': {
            status: 'rejected',
            error: { message: 'Error exporting user data' },
          },
        },
      },
    });

    renderWithProviders(<ExportUserData userId={userId} />, store);

    const exportButton = screen.getByText(/export data/i);
    fireEvent.click(exportButton);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error exporting user data:', expect.any(Object));
    });

    console.error.mockRestore();
  });
});
