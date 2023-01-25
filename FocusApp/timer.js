const el = document.querySelector(".clock");
const bell = document.querySelector("audio");
const clkSound = new Audio('clickSound.mp3');
const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");

const startBtn = document.querySelector(".start");
localStorage.setItem("btn", "focus");

let initial, totalsecs, perc, paused, mins, seconds;

startBtn.addEventListener("click", () => {
    clkSound.play();
    let btn = localStorage.getItem("btn");

    //if btn is startBtn then grabs focus time from local storage, if btn is not start then sets to break and we get breaktime from local storage. Then we start our timer w either break or focus time, +converts to a num
    if (btn === "focus") {
        mins = +localStorage.getItem("focusTime") || 1;
      } else {
        mins = +localStorage.getItem("breakTime") || 1;
      }

    seconds = mins * 60;
    totalsecs = mins * 60;
    setTimeout(decremenT(),60);
    //hides start btn if started
    startBtn.style.transform = "scale(0)";
    paused = false;

});

function decremenT(){
    mindiv.textContent = Math.floor(seconds/60);
    secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
    if(circle.classList.contains("danger")){
        circle.classList.remove("danger");
    }

    if(seconds > 0){
        perc = Math.ceil((totalsecs - seconds)/totalsecs * 100);
        setProgress(perc);
        seconds--;
        initial = window.setTimeout("decremenT()", 1000);
        if(seconds<10){
            circle.classList.add("danger");
        }
        //every sec decrement() is called mins and secs reassigned
    } else {
    mins = 0;
    seconds = 0;
    bell.play();
    let btn = localStorage.getItem("btn");

    if (btn === "focus") {
      startBtn.textContent = "Start Break";
      startBtn.classList.add("break");
      localStorage.setItem("btn", "break");
    } else {
      startBtn.classList.remove("break");
      startBtn.textContent = "Start Focus";
      localStorage.setItem("btn", "focus");
    }
    startBtn.style.transform = "scale(1)"; //show btn again
    }

}