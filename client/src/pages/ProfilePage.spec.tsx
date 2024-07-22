import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Page from '../ui/page/Page';
import { expect, describe, it } from 'vitest';

describe('Page', () => {
  it('renders a specific div element', () => {
    render(
      <MemoryRouter>
        <Page content={<div data-testid="test-div">Test Div Content</div>} />
      </MemoryRouter>,
    );

    const testDiv = screen.getByTestId('test-div');

    expect(testDiv).toBeInTheDocument();
    expect(testDiv).toHaveTextContent('Test Div Content');
  });
});
