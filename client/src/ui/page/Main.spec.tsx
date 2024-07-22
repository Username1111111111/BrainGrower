import React from 'react';
import { render } from '@testing-library/react';
import MainContent from './Main';
import { it, expect, describe } from 'vitest';

describe('MainContent', () => {
  it('renders MainContent component', () => {
    render(<MainContent content={<div>Test Content</div>} />);
  });

  it('displays the provided content', () => {
    const testContent = <div>Test Content</div>;
    const { getByText } = render(<MainContent content={testContent} />);

    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
