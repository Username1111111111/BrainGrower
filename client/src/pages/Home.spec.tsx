import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Home from './Home';
import { expect, describe, it } from 'vitest';

describe('Home', () => {
  it('renders welcome message inside Page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('welcomeMessage')).toBeInTheDocument();
  });
});
