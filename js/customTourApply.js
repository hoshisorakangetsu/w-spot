// guarded by loginGuard, can safely retrieve logged in user
const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))

window.addEventListener("load", () => {
  console.log(loggedInUser)
  // if the user is TOUR_GUIDE, cannot apply
  if (loggedInUser.role !== 'TRAVELLER') {
    alert('Sorry but only TRAVELLERS can\'t apply for custom tours')
    goHome()
  }
})

// currency input
const budgetEl = document.getElementById('budget')
budgetEl.addEventListener("focus", () => {
  budgetEl.value = budgetEl.value.replace("RM", "").trim()  // remove the RM
})
budgetEl.addEventListener("blur", () => {
  let budget = parseFloat(budgetEl.value)
  budget = budget.toFixed(2)  // convert to 2 decimal format
  // toFixed returns string, so NaN shud be checked using string
  budgetEl.value = `RM ${budget !== "NaN" ? budget : ""}`  // add back RM infront
})
budgetEl.addEventListener("keydown", e => {
  console.log(e, e.key)
  // check if the key is a number if not a number, will return NaN
  const key = parseInt(e.key)
  // only allow 0 - 9, backspace, tab and . in the input
  if (
    key === NaN 
    || !((key >= 0 && key <= 9) || e.key === 'Backspace' || e.key === '.' || e.key === 'Tab')
  ) {
    // prevent browser default behavior
    e.preventDefault()
    return
  }
})

// store the form data in localStorage (extract the array out, then push to that array and stringify it again)
function applyTour(el, ev) {
  // prevent default submission
  ev.preventDefault()

  // get the inputs' values
  // personal infos
  const customer = loggedInUser.username
  const customerName = document.getElementById('name').value
  const customerIC = document.getElementById('ic').value
  const customerEmail = document.getElementById('email').value
  const customerHpNo = document.getElementById('pNumber').value
  // tour infos
  const title = document.getElementById('tourTitle').value
  const startDateEl = document.getElementById('sDate')
  const startDate = new Date(startDateEl.value)
  const endDate = new Date(document.getElementById('eDate').value)
  const details = document.getElementById('detailInfo').value



  const today = new Date()
  const ONE_DAY = (24 * 60 * 60 * 1000)
  if (startDate <= today.getTime() + ONE_DAY) {
    alert("Start date cannot be less than today or today or tomorrow!")
    return
  }

  if (startDate >= endDate) {
    alert("Start Date cannot be more than End Date!")
    return
  }

  if (budgetEl.value === 'RM ') {
    alert("Please input budget!")
    return
  }

  if (!el.checkValidity()) {
    el.reportValidity()
    return
  }

  const customTourObj = {
    customer,
    customerName,
    customerIC,
    customerEmail,
    customerHpNo,
    title,
    budget: budgetEl.value,
    startDate,
    endDate,
    details,
    status: 'Pending',  // PENDING by default
  }
  console.log(customTourObj)

  // if custom tour doesn't exist, make an empty array
  const customToursStr = localStorage.getItem('customTours') || '[]'
  const customTours = JSON.parse(customToursStr)
  customTours.push(customTourObj)
  // convert back to json and push to localstorage
  localStorage.setItem('customTours', JSON.stringify(customTours))

  alert("Applied successful! Please wait while we find a tour guide for you!")
  location.href = './Tours.html'
}
