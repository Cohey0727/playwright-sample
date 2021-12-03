const loginButton = () =>
  `a[class="attendance-button-mfid attendance-button-link attendance-button-size-wide"]`;
const submitButton = () => `input[type="submit"]`;
const timeInput = () =>
  `input[type="text"][class="attendance-input-field-small"]`;
const calendarRow = () => `.attendance-table-contents tr`;
const classificationCell = () => ".column-classification";
const inputCell = () => ".column-attendance-record";

const emailInput = () => `input[name="mfid_user[email]"]`;

const passwordInput = () => `input[name="mfid_user[password]"]`;

export default {
  emailInput,
  loginButton,
  passwordInput,
  submitButton,
  calendarRow,
  classificationCell,
  inputCell,
  timeInput,
};
