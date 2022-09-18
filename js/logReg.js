// functions for login AND register

// adds the submitted class to el
function addSubmitted(el) {
  el.classList.add('submitted')
}

// add event listener to remove 'invalid' class from div on input
function resetInvalidEvent(el) {
  el.addEventListener('input', (ev) => {
    if (ev.target.value.trim().length !== 0) {
      ev.target.parentNode.classList.remove('invalid')
      ev.target.setCustomValidity('')  // remove the invalid state
    } else {
      ev.target.parentNode.classList.add('invalid')
      ev.target.setCustomValidity('loll')  // doesn't matter what are it's contents, as long as smtg is in, invalid state will be set
    }
  })
}

function emptyFieldHandler(fields) {
  let hasEmptyRequired = false
  fields.forEach(el => {
    // check validity of the input field, can use only querySelector as am very certain there will only be a input inside each div
    // if the field is required and the value after trim is 0
    const inputField = el.querySelector('input')
    if (inputField.required && inputField.value.trim().length === 0) {
      el.setAttribute('data-invalid-msg', 'Please fill in this field')
      el.classList.add('invalid')
      hasEmptyRequired = true

      // to allow remove the please fill in blablabla when user input
      resetInvalidEvent(inputField)
    }
    else
      el.classList.remove('invalid')
  })
  return hasEmptyRequired
}

function login(ev) {
  // add submitted class to the form (the parent)
  addSubmitted(ev.target.parentNode)
  // the only thing i cant do without the has selector (display form valid message haizz in the end still need js for this)
  // will display a Please fill in this field message for form-inputs if check validity failed
  // and checkvalidity will only fail cuz i know its only required, so it will only fail if user entered ntg
  // select all divs with .form-input that is inside login-register-dialog-right
  const inputDivs = document.querySelectorAll('.login-register-dialog-right .form-input')
  console.log(inputDivs)
  const isFormValid = !emptyFieldHandler(inputDivs)

  // exit the function if form is not valid
  if (!isFormValid) return

  // TODO: add login functionality
  const usernameEl = document.querySelector('#username')
  const passwordEl = document.querySelector('#password')

  // will be running this code twice, so made a closure to make life easier
  const loginFailed = () => {
    // sets isvalid state for both usernameEl and passwordEl, resets the values, adds invalid class to their parents (the divs)
    usernameEl.value = ''
    usernameEl.setCustomValidity('Username not found/password unmatch')
    usernameEl.parentElement.setAttribute('data-invalid-msg', 'Username not found/password unmatch')
    usernameEl.parentElement.classList.add('invalid')

    passwordEl.value = ''
    passwordEl.setCustomValidity('Username not found/password unmatch')
    passwordEl.parentElement.setAttribute('data-invalid-msg', 'Username not found/password unmatch')
    passwordEl.parentElement.classList.add('invalid')
    resetInvalidEvent(usernameEl)
    resetInvalidEvent(passwordEl)
  }

  const localUser = localStorage.getItem(usernameEl.value)
  console.log(localUser)
  if (!localUser) {
    loginFailed()

    // just exit the function
    return
  }

  const userObj = JSON.parse(localUser)
  if (!(passwordEl.value === userObj.password)) {
    loginFailed()

    return
  }

  // sets the localUser as the loggedInUser
  sessionStorage.setItem('loggedInUser', localUser)
}

// TODO: add register functionality
function register(ev) {}
