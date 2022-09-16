// DON'T INCLUDE THIS IN INDEX.HTML
// This file guards against unlogged in user to not be able to view logged in user's routes
if (!isLoggedIn) {
  window.location.href = 'index.html'
}
