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
  document.getElementById('role').innerHTML = loggedInUser.role.split('_').join(' ')
  // render user name
  document.getElementById('username').innerHTML = loggedInUser.username

  // if there are custom tours available, set the display of no custom tours available to none
  const customToursStr = localStorage.getItem('customTours')

  if (customToursStr) {
    document.getElementById('no-custom-tour').style.display = 'none';
    const customTourListDiv = document.getElementById('custom-tour-list')
    customTourListDiv.style.display = 'flex'

    // convert custom tours into js workable array
    let customTours = JSON.parse(customToursStr)

    // if is traveller, only show those which id is his/her own
    if (loggedInUser.role === 'TRAVELLER')
      customTours = customTours.filter(tour => tour.customer === loggedInUser.username)

    // start to generate the childrens
    customTours.forEach(tour => {
      // the container, <div class="applied-tours-card">
      const tourContainer = document.createElement('div')
      tourContainer.classList.add('applied-tours-card')
      // the template (content inside)
      const template = `
        <h2>${tour.title}</h2>
        <h4>Applied By: <span title="${tour.customer}">${tour.customer}</span></h4>
        <h4>Status: <span>${tour.status}</span></h4>
        <button 
          class="action-btn-primary"
          onclick="acceptTour('${tour.title}')"
        >Accept</button>
      `
      // set the template to be the html of the container
      // not very safe but is just front end, so ok
      tourContainer.innerHTML = template
      // append the tour into the bigger container
      customTourListDiv.appendChild(tourContainer)
    })

  }
}
