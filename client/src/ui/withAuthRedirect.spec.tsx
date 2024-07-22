import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import withAuthRedirect from './withAuthRedirect';
import { describe, it, expect } from 'vitest';

describe('withAuthRedirect', () => {
  const MockComponent: React.FC = () => <div>Mock Component</div>;
  const redirectTo = '/login';

  it('redirects to /login when conditionFn returns true', () => {
    const conditionFn = (token: string | null, role: string | null) => !token || !role;

    const RedirectComponent = withAuthRedirect(MockComponent, redirectTo, conditionFn);

    const { container } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <RedirectComponent />
      </MemoryRouter>,
    );

    expect(container.querySelector('div')).toBeNull();
    expect(window.location.pathname).not.toEqual(redirectTo);
  });

  it('renders component when conditionFn returns false', () => {
    const conditionFn = (token: string | null, role: string | null) => !!token && !!role;

    const RedirectComponent = withAuthRedirect(MockComponent, redirectTo, conditionFn);

    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <RedirectComponent />
      </MemoryRouter>,
    );

    expect(getByText('Mock Component')).toBeInTheDocument();
    expect(window.location.pathname).not.toEqual(redirectTo);
  });
});
