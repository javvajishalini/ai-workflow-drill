import { describe, it, expect } from 'vitest';
import { validateField, validateForm } from './validation.js';

describe('Validation Logic', () => {
  describe('validateField - fullName', () => {
    it('returns error when Full Name is empty', () => {
      expect(validateField('fullName', '')).toBe('Full Name is required.');
      expect(validateField('fullName', '   ')).toBe('Full Name is required.');
    });

    it('returns empty string when Full Name is valid', () => {
      expect(validateField('fullName', 'John Doe')).toBe('');
    });
  });

  describe('validateField - email', () => {
    it('returns error when email is empty', () => {
      expect(validateField('email', '')).toBe('Email address is required.');
    });

    it('returns error when email format is invalid', () => {
      expect(validateField('email', 'invalid-email')).toBe('Please enter a valid email address.');
      expect(validateField('email', 'john@')).toBe('Please enter a valid email address.');
      expect(validateField('email', 'john@domain')).toBe('Please enter a valid email address.');
    });

    it('returns empty string when email is valid', () => {
      expect(validateField('email', 'john.doe@example.com')).toBe('');
    });
  });

  describe('validateField - password', () => {
    it('returns error when password is empty', () => {
      expect(validateField('password', '')).toBe('Password is required.');
    });

    it('returns error when password is less than 8 characters', () => {
      expect(validateField('password', '1234567')).toBe('Password must be at least 8 characters long.');
    });

    it('returns empty string when password is 8 or more characters', () => {
      expect(validateField('password', '12345678')).toBe('');
      expect(validateField('password', 'securePassword123')).toBe('');
    });
  });

  describe('validateField - confirmPassword', () => {
    it('returns error when confirmPassword is empty', () => {
      expect(validateField('confirmPassword', '', { password: 'securePassword123' })).toBe('Please confirm your password.');
    });

    it('returns error when confirmPassword does not match password', () => {
      expect(validateField('confirmPassword', 'wrongPass', { password: 'securePassword123' })).toBe('Passwords do not match.');
    });

    it('returns empty string when confirmPassword matches password', () => {
      expect(validateField('confirmPassword', 'securePassword123', { password: 'securePassword123' })).toBe('');
    });
  });

  describe('validateForm', () => {
    it('returns isValid = false when all fields are empty', () => {
      const formData = { fullName: '', email: '', password: '', confirmPassword: '' };
      const { errors, isValid } = validateForm(formData);
      expect(isValid).toBe(false);
      expect(errors.fullName).toBe('Full Name is required.');
      expect(errors.email).toBe('Email address is required.');
      expect(errors.password).toBe('Password is required.');
      expect(errors.confirmPassword).toBe('Please confirm your password.');
    });

    it('returns isValid = false when any field has error', () => {
      const formData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'pass',
        confirmPassword: 'pass'
      };
      const { errors, isValid } = validateForm(formData);
      expect(isValid).toBe(false);
      expect(errors.password).toBe('Password must be at least 8 characters long.');
    });

    it('returns isValid = true when all fields are valid', () => {
      const formData = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        password: 'securePassword123',
        confirmPassword: 'securePassword123'
      };
      const { errors, isValid } = validateForm(formData);
      expect(isValid).toBe(true);
      expect(Object.keys(errors)).toHaveLength(0);
    });
  });
});
