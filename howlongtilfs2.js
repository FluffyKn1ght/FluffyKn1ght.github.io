let loaded = false
let playingBgm = false

const TARGET_TIME = new Date(new Date("Dec 27, 2025 00:00:00").toLocaleString("en-US", {timeZone: "Etc/GMT"})).getTime()

function getTimeLeft() {
    var now = new Date().getTime()

    var dist = TARGET_TIME - now

    var d = Math.floor(dist / (1000 * 60 * 60 * 24))
    var h = Math.floor(dist % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    var m = Math.floor(dist % (1000 * 60 * 60) / (1000 * 60))
    var s = Math.floor(dist % (1000 * 60) / 1000)

    return `${d} days, ${h}h ${m}m ${s}s`
}

function doTimer() {
  let timer = document.getElementById("timer");

  if (timer) {
    timer.animate([
      {filter: "blur(1px)", color: "#00cfff", fontSize: "50px"},
      {filter: "none", color: "white", fontSize: "48px"}
    ], {duration: 1000})
    timer.textContent = getTimeLeft()
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
    setInterval(doTimer, 1000)

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

        let timeLeft = getTimeLeft()
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