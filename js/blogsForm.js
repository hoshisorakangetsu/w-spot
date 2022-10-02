const ratingsDiv = document.querySelector('.ratings-wrapper')

// add selectRating function to all the children (the stars) of the rating div
Array.from(ratingsDiv.children).forEach(el => el.addEventListener("click", selectRating))

function selectRating(ev) {
  console.log(ev.target.dataset.starIndex)
  const selectedStar = ev.target.dataset.starIndex
  // reset all the spans to empty star first
  // get the current span's position 1 - 5, select all the spans before it and change it to filled star
  Array.from(ratingsDiv.children).forEach(el => {
    if (el.dataset.starIndex <= selectedStar)
      el.innerHTML = '&#9733;'
    else 
      el.innerHTML = '&#9734;'
  })
  ratingsDiv.dataset.selected = selectedStar
}

function cancelinput() {
  document.getElementById("myform").reset()
  // reset the star selection
  Array.from(ratingsDiv.children).forEach(el => el.innerHTML = '&#9734;')
  ratingsDiv.dataset.selected = '0'
}

function myfunc(form, e) {
  e.preventDefault();  // prevent redirect

  if (!form.checkValidity()) {
    form.reportValidity();
  } else if (parseInt(ratingsDiv.dataset.selected) !== NaN && parseInt(ratingsDiv.dataset.selected) <= 0) {
    // no stars selected
    alert("Please select a star rating!");
  } else {
    var publish = confirm("Do you want to publish this blog?");
    if (publish) {
      alert("You have successfully published this blog");
      goHome()
    } else alert("You cancelled the operation");
  }
}