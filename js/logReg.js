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
      // set the attribute on div to render the after
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
  // retrieve last location before heading to login (will be safe even if user registered before login as register won't be saved in sessionStorage)
  alert('Login successful! Welcome, ' + usernameEl.value)
  window.location.href = sessionStorage.getItem('lastPath') || './index.html'  // go to home if no previous path
}

// atm will not be checking for username exists, we only need a mvp, those stuffs are bttr handled with a real backend
function register(ev) {
  // add submitted class to the form (the parent)
  addSubmitted(ev.target.parentNode)
  // the only thing i cant do without the has selector (display form valid message haizz in the end still need js for this)
  // will display a Please fill in this field message for form-inputs if check validity failed
  // and checkvalidity will only fail cuz i know its only required, so it will only fail if user entered ntg
  // select all divs with .form-input that is inside login-register-dialog-right
  const inputDivs = document.querySelectorAll('.login-register-dialog-right .form-input')
  const isFormValid = !emptyFieldHandler(inputDivs)

  // exit the function if form is not valid
  if (!isFormValid) return

  const usernameEl = document.querySelector('#username')
  const passwordEl = document.querySelector('#password')
  const password2El = document.querySelector('#password2')
  const isTourGuide = document.querySelector('#isTourGuide').checked

  // will be running this code twice, so made a closure to make life easier
  const registerFailed = () => {
    // sets isvalid state for both passwordEls, resets the values, adds invalid class to their parents (the divs)
    passwordEl.value = ''
    passwordEl.setCustomValidity('Username not found/password unmatch')
    passwordEl.parentElement.setAttribute('data-invalid-msg', 'Both passwords are not the same')
    passwordEl.parentElement.classList.add('invalid')

    password2El.value = ''
    password2El.setCustomValidity('Two passwords unmatch')
    password2El.parentElement.setAttribute('data-invalid-msg', 'Both passwords are not the same')
    password2El.parentElement.classList.add('invalid')
    resetInvalidEvent(passwordEl)
    resetInvalidEvent(password2El)
  }

  // check if the two passwords are the same
  if (passwordEl.value !== password2El.value) {
    registerFailed()

    return
  }

  const newUserObj = {
    username: usernameEl.value,
    password: passwordEl.value,
    role: isTourGuide ? 'TOUR_GUIDE' : 'TRAVELLER'
  }

  // if the user is a tour guide, append to the tourGuide array in localStorage
  if (isTourGuide) {
    // if fail to retrieve tourGuides from localStorage, mean it doesn't exist yet, initialize it with an empty arr
    let tourGuides = localStorage.getItem('tourGuides')
    if (!tourGuides) 
      tourGuides = []
    else 
      tourGuides = JSON.parse(tourGuides)
    
    // this is just a MVP, so there are no repeat checks, and repeat checks should be done by real backends anyways
    tourGuides.push(usernameEl.value)
    localStorage.setItem('tourGuides', JSON.stringify(tourGuides))
  }


  localStorage.setItem(usernameEl.value, JSON.stringify(newUserObj))
  alert('Register success, welcome, ' + usernameEl.value + '! Please login!')

  // redirect user to login page
  goToLogin()
}
