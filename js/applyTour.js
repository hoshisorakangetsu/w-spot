// hardcoded tours that are currently available on our website rn
// use tours[index] to get access to the tour obj, which has price in it
const tours = [
  {
    title: "George Town Walk",
    price: 388,
    tourDuration: 2  // in days
  },
  {
    title: "Penang Full Day Tour",
    price: 500,
    tourDuration: 2
  }
]

// get which tour they clicked apply from (the # part, use substring to remove the #)
const fromTour = parseInt(window.location.hash.substring(1))
const tripSelect = document.getElementById('trip')

// append the options to tripSelect element
tours.forEach((tour, i) => {
  // create an option value
  const option = document.createElement('option')
  option.value = i
  // safe to use innerHTML as the tours array only accessible here, no XSS oppoturnity
  option.innerHTML = tour.title

  // add the option as a child into the select
  tripSelect.appendChild(option)
})

let selectedTour

// to store the price calculated
let finalPrice

// TODO: if fromTour is invalid or not exist, noneed autofill the select option
if (fromTour !== NaN) {
  // auto fill the select option
  tripSelect.value = fromTour.toString()
  selectedTour = fromTour - 1  // -1 becuz is index
}

// listen to select option change, change selectedTour
tripSelect.addEventListener("change", () => {
  selectedTour = parseInt(tripSelect.value) - 1
  calcPrice()
})

// elements needed for calculation (listen for their change and update the price)
const pax = document.getElementById('pax')
const promo = document.getElementById('promo')

pax.addEventListener("change", calcPrice)
promo.addEventListener("change", calcPrice)
// calculate price one time
calcPrice()

function calcPrice() {
  // if there are no selected tour, no need execute remaining stuff
  if ((!selectedTour && selectedTour !== 0) || selectedTour < 0) return

  // parseInt discards decimal if user enters one
  finalPrice = parseInt(pax.value) * tours[selectedTour].price

  if (promo.value && promo.value === '3ast3r3gg') {
    finalPrice -= 50
  }

  const priceEl = document.getElementById('price')
  priceEl.value = `RM ${finalPrice !== NaN ? finalPrice : '-'}`
}

const startDateEl = document.getElementById('sDate')
startDateEl.addEventListener("change", calcEndDate)

function calcEndDate() {
  // if there are no selected tour, no need execute following stuff
  if (!selectedTour || selectedTour < 0) return

  // to auto calculate the end date for user
  // one day is 24hr * 60 min * 60 sec * 1000 ms
  const ONE_DAY = (24 * 60 * 60 * 1000)
  // start date cannot be equal to or less than today + 1
  const today = new Date()
  const startDate = new Date(startDateEl.value)
  if (startDate <= today.getTime() + ONE_DAY) {
    alert("Start date cannot be less than today or today or tomorrow!")
    startDateEl.setCustomValidity("Start date cannot be less than today or today or tomorrow!")
    return
  } 

  // reset the custom validity
  startDateEl.setCustomValidity("")
  const endDateEl = document.getElementById('eDate')
  const endDate = startDate.getTime() + (tours[selectedTour].tourDuration * ONE_DAY)

  endDateEl.value = toInputDateValue(new Date(endDate))
}

// TODO: check form invalid
function submitForm(el, ev) {
  // prevent default submission behavior
  ev.preventDefault()

  // if check validity fail, report it to user and exit the function
  if (!el.checkValidity()) {
    el.reportValidity()
    return
  }

  // user no select tiok tour
  if (selectedTour < 0) {
    alert("Please select a tour")
    // focus the element for them
    tripSelect.focus()
    return
  }

  // if the final price exists and is not a number
  if (!finalPrice || finalPrice === NaN) {
    alert("Couldn't calculate price, have you inputted all the fields correctly?")
    return
  }

  alert(`${document.getElementById('name').value} have applied for ${tours[selectedTour].title}. Please pay RM ${finalPrice}`)
  location.href = './Tours.html'
}

function toInputDateValue(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${
    date.getDate().toString().padStart(2, "0")  // they need dd for the format,convert to string then add 0 paddings to the front
  }`
}
