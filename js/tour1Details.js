// video element (only one video across the whole page, safe to select the element directly)
const vidEl = document.querySelector('video')
// listen to video play, when video play, pause currently playing media player (most likely is bgm)
vidEl.addEventListener("play", () => {
  if (nowPlaying) {
    nowPlaying.pause()
    previouslyPlaying = nowPlaying
    nowPlaying = vidEl
  }
})
// listen to video pause and end, if there is media previously playing that is not ourself, resume that
addMultipleEventListeners(vidEl, () => {
  if (previouslyPlaying && previouslyPlaying !== vidEl) {
    previouslyPlaying.play()
    nowPlaying = previouslyPlaying
    previouslyPlaying = null
  }
}, "pause", "end")
