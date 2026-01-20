window.addEventListener("DOMContentLoaded", () => {

const DEV_MODE = false;

const WORK_TIME = DEV_MODE ? 10 : 1500;
const BREAK_TIME = DEV_MODE ? 5 : 300;
const LONG_BREAK_TIME = DEV_MODE ? 8 : 1800; 



const start = document.getElementById("startBtn");
const pause = document.getElementById("pauseBtn");
const reset = document.getElementById("resetBtn");
const timer = document.getElementById("timer");
const statusDisplay = document.getElementById("status");



const workTime = 1500;
const breakTime = 300;
const longBreak = 1800;

let mode = "work";
let pomodoroCount = 0;
let timeLeft = WORK_TIME;
let totalTime = WORK_TIME;
let interval;


const startTimer = () => {
    if (interval) return;

    interval = setInterval(() => {
        timeLeft--;
        updateTimer();
        

    if (timeLeft <= 0){
        clearInterval(interval);
        interval = null;

        if (mode === "work") {
            pomodoroCount++;

             if (pomodoroCount % 4 === 0) {
                mode = "longBreak";
                totalTime = LONG_BREAK_TIME;
                statusDisplay.textContent = "Amazing work! Take a long break";
             } else {
                mode = "break";
                totalTime = BREAK_TIME;
                statusDisplay.textContent = "Well done! It's time for a break";
             }
        } else {
            mode = "work";
            totalTime = WORK_TIME;
            statusDisplay.textContent = "Time to study";
        }

        timeLeft = totalTime;
        updateTimer();
        startTimer();
    }
  },1000);
};


const updateTimer = () => { 
const minutes = Math.floor(timeLeft / 60); 
const seconds = timeLeft % 60;
timer.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};


const pauseTimer = () => {
clearInterval(interval);
interval = null;
};
const resetTimer = () => {
    clearInterval(interval);
    mode = "work";
    pomodoroCount = 0;
    totalTime = WORK_TIME;
    timeLeft = WORK_TIME;
    statusDisplay.textContent = "Are you ready to get back to work?";
    updateTimer();
};


start.addEventListener("click", startTimer);
pause.addEventListener("click", pauseTimer);
reset.addEventListener("click", resetTimer);

updateTimer();

});
