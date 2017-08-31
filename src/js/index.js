function showErrors(field) {
  const fieldParent = field.parentNode;
  const errorField = fieldParent.querySelector('.form--error--message');

  // Do not do anything if there is a missing error message.
  if (!errorField) {
    console.log(`Error message for the required field ${field.name} is missing. Please add an error message.`);
    return;
  }

  // If all the error messages are there, we are good to go!
  errorField.style.opacity = '1';

  // Make sure to put the border only on the right elements
  if (field.type === 'radio' || field.type === 'checkbox') {
    return;
  }

  field.classList.add('form--error--field');
}

function verifyIsEmpty() {
  const requiredFields = document.querySelectorAll('.required--field');

  requiredFields.forEach((thisField) => {
    if (thisField.value === '') {
      showErrors(thisField);
    }
  });
}

function verifyIsChecked(groupName) {
  const radioButtons = document.getElementsByName(groupName);

  radioButtons.forEach((thisRadioButton) => {
    if (!thisRadioButton.checked) {
      showErrors(thisRadioButton);
    }
  });
}

// if (!checkFields()) {
//   console.log('not good to go!');
// }

// verifyIsEmpty();
// verifyIsChecked('terms');
// verifyIsChecked('gender');
