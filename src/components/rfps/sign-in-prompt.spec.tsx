import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SignInPrompt } from './sign-in-prompt';

describe('SignInPrompt', () => {
  test('renders correct hidden count', () => {
    const totalCount = 15;
    render(<SignInPrompt totalCount={totalCount} />);
    expect(screen.getByText(/5 more RFPs available/)).toBeInTheDocument();
  });

  test('shows singular "RFP" when hiddenCount is 1', () => {
    const totalCount = 11;
    render(<SignInPrompt totalCount={totalCount} />);
    expect(screen.getByText(/1 more RFP available/)).toBeInTheDocument();
  });

  test('shows plural "RFPs" when hiddenCount > 1', () => {
    const totalCount = 12;
    render(<SignInPrompt totalCount={totalCount} />);
    expect(screen.getByText(/2 more RFPs available/)).toBeInTheDocument();
  });

  test('contains sign-in link', () => {
    const totalCount = 15;
    render(<SignInPrompt totalCount={totalCount} />);
    const signInLinks = screen.getAllByRole('link');
    const signInLink = signInLinks.find((link) =>
      link.textContent?.includes('Sign In'),
    );
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/login');
  });

  test('contains demo account link', () => {
    const totalCount = 15;
    render(<SignInPrompt totalCount={totalCount} />);
    const demoLink = screen.getByText('Try Demo Account');
    expect(demoLink).toBeInTheDocument();
    expect(demoLink.closest('a')).toHaveAttribute('href', '/login');
  });
});
