// to simplify html code
function goHome() {
  window.location.href = './index.html'
}

// should start to use this function everywhere as it helps remember where u are before u login
function goToLogin() {
  // only set last path if it is not register.html (we dont wanna redirect user back to register do ya)
  if (!window.location.href.includes('register.html')) {
    sessionStorage.setItem('lastPath', window.location.href)
  }
  window.location.href = './login.html'
}

// if user is logged in, this will be a string with smtg inside, if not it will be null
let isLoggedIn = !!sessionStorage.getItem('loggedInUser')

// logout is rather trivial, just clear sessionStorage's loggedInUser and redirect to home
// if and only if user is logged in, even though user should not have access to this function without logging in (normal users)
function logout() {
  if (!isLoggedIn) return
  sessionStorage.removeItem('loggedInUser')
  goHome()
}

// go to the top of the document (not supported in IE)
function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const userMenuBtn = document.querySelector('#user-menu')
let isUserMenuOpen = false
let openedMenuId = ''

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
window.onscroll = () => {
  if (document.body.scrollTop >= 40 || document.documentElement.scrollTop >= 40) {
    headerIsFloating = true
    header.classList.add('collapsed', 'floating')
    document.getElementById('goToTop').style.display = 'block'
  } else {
    // if the scroll is not that big then the class shall be removed
    headerIsFloating = false
    header.classList.remove('collapsed', 'floating')
    document.getElementById('goToTop').style.display = 'none'
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

// below are bgm related variables and functions
// element that is responsible for playing bgm
const bgmEl = document.getElementById('bgm-audio')
// set the volume to lower
bgmEl.volume = 0.4
// the now playing (to show the song name)
const nowPlayingBGMEl = document.getElementById('now-playing')
// the 4 buttons
const lastBgmEl = document.getElementById('last-bgm')
const pauseBgmEl = document.getElementById('pause-bgm')
const playBgmEl = document.getElementById('play-bgm')
const nextBgmEl = document.getElementById('next-bgm')
// folder the bgms are located at (relative to the html files)
const bgmFolder = '../assets/'
// list of available bgms
const bgms = [
  {
    songName: 'The City Favored By The Winds',
    fileName: 'mond1.mp3'
  }, 
  {
    songName: 'Bustling Afternoon in Mondstadt',
    fileName: 'mond2.mp3'
  }, 
  {
    songName: 'Liyue',
    fileName: 'liyue.mp3'
  }, 
  {
    songName: 'Hustle and Bustle of Ormos',
    fileName: 'ormos-day.mp3'
  }
]
// currently playing bgm (used for next and previous), -1 means no bgm playing
let currentBgm = -1
// the element that is currently playing any media
let nowPlaying = null
// the element that was previously playing media
let previouslyPlaying = null

function playBgm() {
  // in case there is something playing right now
  if (nowPlaying) {
    nowPlaying.pause()
    previouslyPlaying = nowPlaying
  }

  // if there arent any bgm playing before, just make the play button start from first song
  currentBgm = currentBgm < 0 ? 0 : currentBgm
  bgmEl.src = bgmFolder + bgms[currentBgm].fileName
  bgmEl.play()
  nowPlaying = bgmEl
  nowPlayingBGMEl.innerText = bgms[currentBgm].songName
}

function pauseBgm() {
  // if the bgm is not now playing, quit the function
  if (!nowPlaying || nowPlaying !== bgmEl) 
    return
  
  bgmEl.pause()
  // if there is smtg playing before, but is not ourselves, play tht
  if (previouslyPlaying && previouslyPlaying !== bgmEl) {
    previouslyPlaying.play()
    nowPlaying = previouslyPlaying
  } else {
    nowPlaying = null
  }
}

function nextBgm() {
  // if the bgm is playing now, and the current bgm is not a negative number
  if (nowPlaying === bgmEl && currentBgm >= 0) {
    // if go out of the list already, start back from the first song
    if (++currentBgm >= bgms.length) {
      currentBgm = 0
    }
    playBgm()
  }
}

function previousBgm() {
  // if the bgm is playing now, and the current bgm is not a negative number
  if (nowPlaying === bgmEl && currentBgm >= 0) {
    // if go out of the list already, start back from the last song
    if (--currentBgm < 0) {
      currentBgm = bgms.length - 1
    }
    playBgm()
  }
}

// assign the buttons to their functions
lastBgmEl.addEventListener('click', previousBgm)
pauseBgmEl.addEventListener('click', pauseBgm)
playBgmEl.addEventListener('click', playBgm)
nextBgmEl.addEventListener('click', nextBgm)

// chrome's autoplay policy
/**
 Chrome's autoplay policies are simple:

  Muted autoplay is always allowed.
  Autoplay with sound is allowed if:
    - User has interacted with the domain (click, tap, etc.).
    - On desktop, the user's Media Engagement Index threshold has been crossed, meaning the user has previously play video with sound.
    - On mobile, the user has added the site to his or her home screen.
*/
// so we need to use a confirm box to ask the user if he/she wants to play the bgm
const bgmDialEl = document.getElementById('want-bgm-prompt')

function closeBGMDialog() {
  bgmDialEl.style.display = 'none'
}

// play a random bgm
function enableBGM() {
  currentBgm = Math.ceil(Math.random() * 4) - 1
  playBgm()
  closeBGMDialog()
}

// go to next bgm when the current one ended
bgmEl.addEventListener('ended', () => nextBgm())
// when pause or play, change the pause play button
bgmEl.addEventListener('pause', () => {
  pauseBgmEl.style.display = 'none'
  playBgmEl.style.display = 'block'
})
bgmEl.addEventListener('play', () => {
  pauseBgmEl.style.display = 'block'
  playBgmEl.style.display = 'none'
})
