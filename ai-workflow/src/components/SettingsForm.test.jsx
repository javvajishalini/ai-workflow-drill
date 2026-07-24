import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SettingsForm from './SettingsForm';

describe('SettingsForm Component', () => {
  it('renders all form fields and submit button disabled by default', () => {
    render(<SettingsForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /save settings/i });
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  it('shows error messages and sets aria-invalid when invalid fields are blurred', () => {
    render(<SettingsForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('shows password length validation error when password is less than 8 chars', () => {
    render(<SettingsForm />);

    const passwordInput = screen.getByLabelText(/^password/i);
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.blur(passwordInput);

    expect(screen.getByText('Password must be at least 8 characters long.')).toBeInTheDocument();
  });

  it('shows confirm password mismatch error', () => {
    render(<SettingsForm />);

    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmInput, { target: { value: 'different123' } });
    fireEvent.blur(confirmInput);

    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
  });

  it('enables submit button when all fields are valid', () => {
    render(<SettingsForm />);

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);
    const submitBtn = screen.getByRole('button', { name: /save settings/i });

    expect(submitBtn).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'securePassword123' } });
    fireEvent.change(confirmInput, { target: { value: 'securePassword123' } });

    expect(submitBtn).not.toBeDisabled();
  });

  it('submits form and calls onSubmitSuccess callback when valid', () => {
    const handleSuccess = vi.fn();
    render(<SettingsForm onSubmitSuccess={handleSuccess} />);

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);
    const submitBtn = screen.getByRole('button', { name: /save settings/i });

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'securePassword123' } });
    fireEvent.change(confirmInput, { target: { value: 'securePassword123' } });

    fireEvent.click(submitBtn);

    expect(handleSuccess).toHaveBeenCalledWith({
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      password: 'securePassword123',
      confirmPassword: 'securePassword123'
    });

    expect(screen.getByText(/account settings updated successfully!/i)).toBeInTheDocument();
  });

  it('toggles password visibility when show/hide password eye button is clicked', () => {
    render(<SettingsForm />);

    const passwordInput = screen.getByLabelText(/^password/i);
    const toggleBtns = screen.getAllByRole('button', { name: /show password/i });
    const passwordToggleBtn = toggleBtns[0];

    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(passwordToggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
