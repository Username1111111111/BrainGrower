import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import CreateUser from './CreateUser';
import { expect, describe, it } from 'vitest';

describe('CreateUser', () => {
  it('renders SignupForm inside Page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateUser />
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
