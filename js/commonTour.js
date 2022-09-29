// this file is for functions that are common to Tour1 and Tour3

// this section responsible for slide in animations
// observer for the key features to observe if they are in the viewport, if they are, make them slide in
// elements that we want to slide them in
const slideInElems = document.querySelectorAll('.slide-in')

// if the browser have intersectionobserver and isIntersecting function is accepted
// PS can actually extract this into a function but for small project like this it's not necessary
if ('IntersectionObserver' in window &&
  'IntersectionObserverEntry' in window &&
  'isIntersecting' in window.IntersectionObserverEntry.prototype) {

  const slideInOptions = {
    // make the place that the observer can see 150px shorter on the bottom side
    rootMargin: '0px 0px -250px 0px'
  }

  const tourLocationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        // if the element not intersecting remove the appear class to make the thing hide agn
        entry.target.classList.remove('appear') 
        return
      }
      entry.target.classList.add('appear')
    })
  }, slideInOptions)

  slideInElems.forEach(elem => {
    tourLocationObserver.observe(elem)
  });

} else {
  // if they are not supported directly show the things, no need for fancy animation so the user can at least see smtg
  slideInElems.forEach(elem => {
    elem.classList.add('appear')
  })
}
