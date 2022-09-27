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

// store the form data in localStorage (extract the array out, then push to that array and stringify it again)
function applyTour() {
  // get the inputs' values
  // personal infos
  const customer = loggedInUser.username
  const customerName = document.getElementById('name').value
  const customerIC =  document.getElementById('ic').value
  const customerEmail = document.getElementById('email').value
  const customerHpNo = document.getElementById('pNumber').value
  // tour infos
  const title = document.getElementById('tourTitle').value
  const startDate = document.getElementById('sDate').value
  const endDate = document.getElementById('eDate').value
  const details = document.getElementById('detailInfo').value

  const customTourObj = {
    customer,
    customerName,
    customerIC,
    customerEmail,
    customerHpNo,
    title,
    startDate,
    endDate,
    details,
  }

  console.log(customTourObj)
}
