const loginButton = () =>
  `a[class="attendance-button-mfid attendance-button-link attendance-button-size-wide"]`;
const submitButton = () => `input[type="submit"]`;
const timeInput = () =>
  `input[type="text"][class="attendance-input-field-small"]`;
const emailInput = () => `input[name="mfid_user[email]"]`;

export default {
  emailInput,
  loginButton,
  submitButton,
  timeInput,
};
