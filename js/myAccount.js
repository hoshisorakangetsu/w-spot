// functions to be used in MyAccount.html

// for now not gonna play with the accept function (eg. changing the status)
function acceptTour(name) {
  const accept = confirm(`Do you want to accept the tour: ${name}?`)
  alert(accept ? 'Tour accepted!' : 'Tour not accepted!')
}

function filterTours(el, section) {
  // select all siblings that have .active class, remove their active class
  el.parentNode.querySelectorAll('.active').forEach(activeEl => {
    activeEl.classList.remove('active')
  });
  // add back the active class on the pressed elements
  el.classList.add('active')

  const premadeDiv = document.getElementById('premade-tours')
  const customDiv = document.getElementById('custom-tours')

  switch (section) {
    case 'all':
      premadeDiv.style.display = 'block'
      customDiv.style.display = 'block'      
      break;
    case 'premade':
      premadeDiv.style.display = 'block'
      customDiv.style.display = 'none'
      break;
    case 'custom':
      premadeDiv.style.display = 'none'
      customDiv.style.display = 'block'
      break;
    default:
      break;
  }
}

// TODO: get whether the current logged in user is a tour guide or a traveller, customize contents
window.onload = () => {
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
  // render role (can safely parse as have log in guard)
  document.getElementById('role').innerHTML = loggedInUser.role
  // render user name
  document.getElementById('username').innerHTML = loggedInUser.username
}
