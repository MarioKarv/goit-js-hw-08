import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
let formData = {};
const formState = 'feedback-form-state';

populateInputs();

form.addEventListener('submit', formSubmit);
form.addEventListener('input', throttle(inputForm, 500));

function formSubmit(e) {
  e.preventDefault();

  const {
    elements: { email, message }
  } = e.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }
  console.log(formData);
  e.target.reset();
  localStorage.removeItem(formState);
}

function inputForm(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(formState, JSON.stringify(formData));
}

function populateInputs() {
  const savedMessage = localStorage.getItem(formState);
  if (savedMessage) {
    formData = JSON.parse(savedMessage);
    for (const key of Object.keys(formData)) {
      form.elements[key].value = formData[key];
    }
  }
}
