// ik naming confusing, but this file contains the function that both myAccount and customTour will use
// for now not gonna play with the accept function (eg. changing the status)
function acceptTour(name) {
  const accept = confirm(`Do you want to accept the tour: ${name}?`)
  alert(accept ? 'Tour accepted!' : 'Tour not accepted!')
}
