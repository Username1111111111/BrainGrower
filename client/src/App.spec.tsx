import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('renders Home page by default', () => {
    render(<App />);

    expect(screen.getByText('Welcome to the BrainGrower!')).toBeInTheDocument();
  });

  it('renders Login page', () => {
    render(<App />);

    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  it('renders Signup page', () => {
    render(<App />);

    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });
});
