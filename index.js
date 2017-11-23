const validateForm = (() => {
  // Public APIs
  const publicAPIs = {};

  const showErrors = (field) => {
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
  };

  publicAPIs.verifyIfEmpty = (element) => {
    const requiredFields = document.querySelectorAll(element);

    requiredFields.forEach((thisField) => {
      if (thisField.value === '') {
        showErrors(thisField);
      }
    });
  };

  publicAPIs.verifyIfMarked = (array) => {
    array.forEach((thisElement) => {
      const requiredItems = document.getElementsByName(thisElement);

      requiredItems.forEach((thisItem) => {
        if (!thisItem.checked) {
          showErrors(thisItem);
        }
      });
    });
  };

  const runValidator = (event) => {
    event.preventDefault();
    // Only run if the form was the right form
    if (!event.target.classList.contains('avocado-validator'));

    // Get the targeted form
    publicAPIs.verifyIfEmpty('.required--field');
    publicAPIs.verifyIfMarked(['terms', 'gender']);
  };

  // Initialize our plugin
  publicAPIs.init = () => {
    document.addEventListener('submit', runValidator);
  };

  // Return our public APIs
  return publicAPIs;
})();

validateForm.init();
