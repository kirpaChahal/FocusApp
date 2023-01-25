const focusTimeInput = document.querySelector("#focusTime");
const breakTimeInput = document.querySelector("#breakTime");
const pauseBtn = document.querySelector(".pause");

focusTimeInput.value = localStorage.getItem("focusTime");
breakTimeInput.value = localStorage.getItem("breakTime");

document.querySelector("form").addEventListener("submit", (e) =>{
    clkSound.play();
    e.preventDefault();
    localStorage.setItem("focusTime", focusTimeInput.value);
    localStorage.setItem("breakTime", breakTimeInput.value);
});

document.querySelector(".reset").addEventListener("click", () => {
    clkSound.play();
    startBtn.style.transform = "scale(1)";
    clearTimeout(initial);
    setProgress(0);
    mindiv.textContent = 0;
    secdiv.textContent = 0;
  });

pauseBtn.addEventListener("click", () => {
    clkSound.play();
    if(paused === undefined){
        return;
    } 
    if(paused){
        paused = false;
        initial = setTimeout("decremenT()", 60);
        pauseBtn.textContent = "Pause";
        pauseBtn.classList.remove("resume");

    } else{
        clearTimeout(initial);
        pauseBtn.textContent = "Resume";
        pauseBtn.classList.add("resume");
        paused = true;
    }
});