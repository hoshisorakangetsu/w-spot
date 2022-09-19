// functions for Tours.html

function showTours(el, section) {
  // select all siblings that have .active class, remove their active class
  el.parentNode.querySelectorAll('.active').forEach(activeEl => {
    activeEl.classList.remove('active')
  });
  // add back the active class on the pressed elements
  el.classList.add('active')

  const tourDiv = document.getElementById('tours')
  const blogDiv = document.getElementById('blogs')

  switch (section) {
    case 'all':
      tourDiv.style.display = 'block'
      blogDiv.style.display = 'block'      
      break;
    case 'tours':
      tourDiv.style.display = 'block'
      blogDiv.style.display = 'none'
      break;
    case 'blogs':
      tourDiv.style.display = 'none'
      blogDiv.style.display = 'block'
      break;
    default:
      break;
  }
}
