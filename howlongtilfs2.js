let loaded = false
let playingBgm = false
let prevSeconds = 0

let TARGET_TIME = new Date(new Date("Dec 27, 2025 00:00:00").toLocaleString("en-US", {timeZone: "Etc/GMT"})).getTime()

function getSecondsLeft() {
  return Math.floor((TARGET_TIME - new Date(new Date().toLocaleString("en-US", {timeZone: "Etc/GMT"})).getTime()) / 1000);
}

function formatTime(time) {
    if (time > 0) {

      var d = Math.floor(time / (60 * 60 * 24))
      var h = Math.floor(time % (60 * 60 * 24) / (60 * 60))
      var m = Math.floor(time % (60 * 60) / 60)
      var s = Math.floor(time % (60))

      return `${d} days, ${h}h ${m}m ${s}s`
    } else {
      return "BETA TESTING HAS BEGUN"
    }
}

function doTimer() {
  let seconds = getSecondsLeft();
  if (seconds == prevSeconds) return;
  prevSeconds = seconds
  
  let timer = document.getElementById("timer");
  let audio = document.getElementById("bgm");
  
  if (timer) {
    timer.animate([
      {filter: "blur(1px)", color: "#00cfff", fontSize: "50px"},
      {filter: "none", color: "white", fontSize: "48px"}
    ], {duration: 1000})
    timer.textContent = formatTime(seconds)
  }
  if (audio && seconds > 0) {
    if (seconds == 58) {
      console.log("YOUTUBE OUTRO")
      audio.src = "xenogenesis.mp3"
      audio.play()
      xenogenesisState = 2;
    }
    if (seconds == 63) {
      console.log("bgm fadeout")
      let volume = 1
      let volumeChanger = setInterval(function() {
        volume -= 0.01 / 5
        if (volume < 0) volume = 0;
        audio.volume = volume
        if (volume == 0) {
          audio.volume = 1
          clearInterval(volumeChanger)
        }
      }, 10)
    }
  }
  
}

function doIntro() {
  console.log("Intro!!")
  let snake = document.getElementById("snake")
  let bg = document.getElementById("background")

  snake.setAttribute("class", "absolute snake snake-in")
  bg.setAttribute("class", "absolute bg bg-in")

  setTimeout(() => {
    snake.setAttribute("class", "absolute snake")
    bg.setAttribute("class", "absolute bg")
  }, 1500)
}

document.onreadystatechange = function(e) {
  if (!loaded) {
    console.log("Loaded!")
    document.getElementById("bgm").play()
    .then((result) => {
      playingBgm = true
      document.getElementById("plzclick").remove()
      setTimeout(doIntro, 15000);
    })
    .catch((reason) => {
      console.log("unable to play bgm because user needs to poke the page first\nDFHGHJDFJHGDFSHHKJ 3:<")
    })
    loaded = true

    doTimer()
    setInterval(doTimer, 10)

    let timer = document.getElementById("timer")
    if (timer) {
      timer.onclick = () => {
        let clickToCopy = document.getElementById("clicktocopy")
        if (clickToCopy) {
          clickToCopy.textContent = "copied time left!"
          setTimeout(() => {
            clickToCopy.textContent = "click to copy"
          }, 1000)
        }

        let timeLeft = formatTime(getSecondsLeft())
        console.log(`Copied time: ${timeLeft}`)
        navigator.clipboard.writeText(timeLeft)
      }
    }
  }
}

document.onclick = function(e) {
  if (!playingBgm) {
    playingBgm = true
    console.log("poke!")
    document.getElementById("bgm").play()
    document.getElementById("plzclick").setAttribute("class", "fadeout")
    setTimeout(() => { document.getElementById("plzclick").remove() }, 800)
    setTimeout(doIntro, 15000);
  }
}