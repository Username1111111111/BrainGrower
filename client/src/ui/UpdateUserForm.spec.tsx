import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { expect, it, describe, beforeEach } from 'vitest';
import UpdateUser from './UpdateUserForm';
import { setSelectedUser } from '../redux/selectedUserSlice';

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
};

describe('UpdateUser', () => {
  beforeEach(() => {
    store.dispatch(setSelectedUser(mockUser));
  });

  it('renders "Select a user to edit" when no user is selected', () => {
    store.dispatch(setSelectedUser(null));

    render(
      <Provider store={store}>
        <UpdateUser />
      </Provider>,
    );

    expect(screen.getByText('selectUser')).toBeInTheDocument();
  });

  it('renders the update form with correct initial values', () => {
    render(
      <Provider store={store}>
        <UpdateUser />
      </Provider>,
    );

    expect(screen.getByLabelText('Name:')).toHaveValue(mockUser.name);
    expect(screen.getByLabelText('Email:')).toHaveValue(mockUser.email);
    expect(screen.getByLabelText('Password:')).toHaveValue('');
  });

  it('enables the update button when form values change', () => {
    render(
      <Provider store={store}>
        <UpdateUser />
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'John Doe Updated' } });

    expect(screen.getByRole('button', { name: 'Update' })).not.toBeDisabled();
  });

  it('disables the update button when form values are unchanged', () => {
    render(
      <Provider store={store}>
        <UpdateUser />
      </Provider>,
    );

    expect(screen.getByRole('button', { name: 'Update' })).toBeDisabled();
  });
});
