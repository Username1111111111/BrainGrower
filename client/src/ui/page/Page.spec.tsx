import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Page from './Page';
import { it, expect, describe } from 'vitest';

describe('Page', () => {
  it('renders Navbar and MainContent components', () => {
    render(
      <MemoryRouter>
        <Page content="Mock Content" />
      </MemoryRouter>,
    );

    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('login')).toBeInTheDocument();
    expect(screen.getByText('signup')).toBeInTheDocument();
    expect(screen.getByText('Mock Content')).toBeInTheDocument();
  });
});
