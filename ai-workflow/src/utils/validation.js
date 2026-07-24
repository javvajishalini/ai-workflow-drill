/**
 * Validation utility functions for SettingsForm
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 8;

/**
 * Validates a single field by name.
 * @param {string} name - Field name
 * @param {string} value - Field value
 * @param {Object} formData - Full form data object for cross-field checks (e.g. confirmPassword)
 * @returns {string} Error message or empty string if valid
 */
export const validateField = (name, value, formData = {}) => {
  const trimmedValue = (value || '').trim();

  switch (name) {
    case 'fullName':
      if (!trimmedValue) {
        return 'Full Name is required.';
      }
      return '';

    case 'email':
      if (!trimmedValue) {
        return 'Email address is required.';
      }
      if (!EMAIL_REGEX.test(trimmedValue)) {
        return 'Please enter a valid email address.';
      }
      return '';

    case 'password':
      if (!value) {
        return 'Password is required.';
      }
      if (value.length < MIN_PASSWORD_LENGTH) {
        return `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`;
      }
      return '';

    case 'confirmPassword':
      if (!value) {
        return 'Please confirm your password.';
      }
      if (value !== formData.password) {
        return 'Passwords do not match.';
      }
      return '';

    default:
      return '';
  }
};

/**
 * Validates all form fields at once.
 * @param {Object} formData - Form values { fullName, email, password, confirmPassword }
 * @returns {{ errors: Object, isValid: boolean }} Validation result object
 */
export const validateForm = (formData) => {
  const fields = ['fullName', 'email', 'password', 'confirmPassword'];
  const errors = {};
  let isValid = true;

  fields.forEach((field) => {
    const error = validateField(field, formData[field], formData);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  });

  return { errors, isValid };
};
