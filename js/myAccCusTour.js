// ik naming confusing, but this file contains the function that both myAccount and customTour will use
// for now not gonna play with the accept function (eg. changing the status)
function acceptTour(type, name, index) {
  const accept = confirm(`Do you want to accept the tour: ${name}?`)
  if (type !== 'custom') {
    alert(accept ? 'Tour accepted!' : 'Tour not accepted!')
    return
  }

  // average users can only access this function if they applied for a custom tour :)))
  let customTours = JSON.parse(localStorage.getItem('customTours'))
  // update the status
  customTours[index].status = accept ? 'Accepted' : 'Pending'
  localStorage.setItem('customTours', JSON.stringify(customTours))
  alert(accept ? 'Tour accepted!' : 'Tour not accepted!')
  // reload to see the changes
  window.location.reload()
}
