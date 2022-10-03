window.addEventListener("load", () => {
  console.log(window.location.hash)
  // if dh hash or hash greater than the length of customTours in localStorage, means not here from MyAccount
  // parse hash into int, ignoring the first char (#)
  const hash = parseInt(window.location.hash.substring(1))
  const customTourStr = localStorage.getItem('customTours') || '[]'
  const customTours = JSON.parse(customTourStr)

  // go to home if no hash or the hash too big
  if (hash === NaN || hash >= customTours.length) {
    goHome()
  }

  // can start rendering the stuffs le :"(((
  const customTourDetail = customTours[hash]

  // the elements
  const title = document.querySelector('#tour-title > h4')
  const customer = document.querySelector('#tour-customer > h4')
  const email = document.querySelector('#tour-email > h4')
  const hpNumber = document.querySelector('#tour-hpNumber > h4')
  const period = document.querySelector('#tour-period > h4')
  const budget = document.querySelector('#tour-budget > h4')
  const addInfo = document.querySelector('#addInfoField')
  const status = document.querySelector('#tour-status > h4')

  // days in a week
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  // dates
  const startDate = new Date(customTourDetail.startDate)
  const endDate = new Date(customTourDetail.endDate)
  const formattedStartDate = `${DAYS[startDate.getDay()]}, ${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`
  const formattedEndDate = `${DAYS[endDate.getDay()]}, ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`
  title.innerText = customTourDetail.title
  customer.innerText = `${customTourDetail.customerName} AKA ${customTourDetail.customer}`
  email.innerText = customTourDetail.customerEmail
  hpNumber.innerText = customTourDetail.customerHpNo
  // can use innerHTML as no fear for XSS, date are created with fixed format
  period.innerHTML = 
    `<em style="color: var(--hsl-primary)">${formattedStartDate}</em> to <em style="color: var(--hsl-primary)">${formattedEndDate}</em> (<em style="color: var(--hsl-primary)">${
      // start date counts as today
      ((endDate - startDate) / 1000 / 60 / 60 / 24) + 1
    }</em> days)`
  budget.innerText = customTourDetail.budget
  addInfo.innerText = customTourDetail.details || 'No Special Requests'
  status.innerText = customTourDetail.status

  // style the addInfo differently if text too long set text align to justify 
  if (customTourDetail.details.length > 80 || customTourDetail.details.includes('\n')) {
    addInfo.style.textAlign = 'justify'
    addInfo.style.width = `${customTourDetail.details.length}ch`  // approximately tht amount of chars + length
    // if there are multiple lines, set the width to the longest line
    if (customTourDetail.details.includes('\n')) {
      let lines = customTourDetail.details.split('\n')
      // get the longest line
      let longestLine = lines.reduce((prev, curr) => prev.length > curr.length ? prev : curr)
      addInfo.style.width = `${longestLine.length + 1}ch`  // approximately tht amount of chars + length
    }
  }

  // accept button disabled for traveller and for accepted, else, bind the acceptTour function to the button
  // can directly parse as got login guard
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
  const acceptTourBtn = document.getElementById('acceptTour')
  console.log(customTourDetail.status, customTourDetail.status === 'Accepted')
  if (loggedInUser.role === 'TRAVELLER' || customTourDetail.status === 'Accepted') {
    acceptTourBtn.disabled = true
  } else {
    acceptTourBtn.addEventListener("click", () => acceptTour('custom', customTourDetail.title, hash))
  }
})
