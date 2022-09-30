// hardcoded tours that are currently available on our website rn
// use tours[index] to get access to the tour obj, which has price in it
const tours = [
  {
    title: "Tour 1",
    price: 100
  },
  {
    title: "Tour 2",
    price: 250
  }
]

// get which tour they clicked apply from (the # part, use substring to remove the #)
const fromTour = parseInt(window.location.hash.substring(1))

// TODO: if fromTour is invalid or not exist, noneed autofill the select option
