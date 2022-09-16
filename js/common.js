// if user is logged in, this will be a string with smtg inside, if not it will be null
let isLoggedIn = sessionStorage.getItem('isLoggedIn')

const userMenuBtn = document.querySelector('#user-menu')
let isUserMenuOpen = false;
let openedMenuId = '';

function toggleMenuActionShow() {
  const userActionMenus = document.querySelectorAll('.user-menu-actions')
  userActionMenus.forEach(userActMenu => {
    // check if the menu is already opened, if it is, close it
    if (isUserMenuOpen && openedMenuId === userActMenu.id) {
      userActMenu.classList.remove('show-user-menu-actions')
      userActMenu.style.display = 'none'
      isUserMenuOpen = false
      openedMenuId = ''
      return
    }
    // if is logged in, will display the menu that only logged in people can see
    if (isLoggedIn) {
      if (userActMenu.id === 'logged-in-menu') {
        userActMenu.style.display = 'flex'
        userActMenu.classList.add('show-user-menu-actions')
        isUserMenuOpen = true
        openedMenuId = userActMenu.id
      }
    } else {
      // else display the general menu
      if (userActMenu.id === 'not-logged-in-menu') {
        userActMenu.style.display = 'flex'
        userActMenu.classList.add('show-user-menu-actions')
        isUserMenuOpen = true
        openedMenuId = userActMenu.id
      }
    }
  })
}

userMenuBtn.addEventListener("click", toggleMenuActionShow)

// if click outside the userMenuBtn, check if the menu is open and if is open, close it
document.addEventListener('click', event => {
  const isClickInsideUserMenu = userMenuBtn.contains(event.target)

  if (!isClickInsideUserMenu) {
    // only toggle the show if menu is opened
    if (isUserMenuOpen) {
      toggleMenuActionShow()
    }
  }
})

/*
Apply the "shrink and float header bar"
- wanted to use intersection observer for optimised performance 
  but that would add a little complexity 
  and not all browsers support the intersection observer (some outdated didnt support)
- make the window listen for onscroll function
- check the scroll on body and the documentElement AKA html itself
- if the scrollTop is big, apply the class designed for the scrolled header
*/
// TODO: Create a button with id goToTop, give it the ability to scroll to the top when clicked
window.onscroll = () => {
  if (document.body.scrollTop >= 40 || document.documentElement.scrollTop >= 40) {
    headerIsFloating = true
    header.classList.add('collapsed', 'floating')
    // document.getElementById('goToTop').style.display = 'block'
  } else {
    // if the scroll is not that big then the class shall be removed
    headerIsFloating = false
    header.classList.remove('collapsed', 'floating')
    // document.getElementById('goToTop').style.display = 'none'
  }
  // unshow the user menu action on scroll also
  if (isUserMenuOpen) {
    toggleMenuActionShow()
  }
}

let header = document.querySelector('header')
// to determine whether to add and remove the collapsed class or not
let headerIsFloating = false
function collapseHeader() {
  console.log(headerIsFloating)
  if (headerIsFloating) {
    header.classList.add('collapsed')
    // unshow the user menu action when the header collapse also
    if (isUserMenuOpen) {
      toggleMenuActionShow()
    }
  }
}

function expandHeader() {
  if (headerIsFloating) {
    header.classList.remove('collapsed')
  }
}

// for some reason focus and focusout doesn't seem to be working, will just leave it here
addMultipleEventListeners(header, collapseHeader, "mouseleave", "focusout")
addMultipleEventListeners(header, expandHeader, "mouseenter", "focus")
