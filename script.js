let timer;
let elapsedTime = 0;
let isRunning = false;
let isPaused = false;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const pauseButton = document.getElementById("pause");
const resumeButton = document.getElementById("resume");
const resetButton = document.getElementById("reset");

function updateDisplay() {
  const hours = String(Math.floor(elapsedTime / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((elapsedTime % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(elapsedTime % 60).padStart(2, "0");
  display.textContent = `${hours}:${minutes}:${seconds}`;
}

startButton.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      elapsedTime++;
      updateDisplay();
    }, 1000);
  }
});

stopButton.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  updateDisplay();
});

pauseButton.addEventListener("click", () => {
  if (isRunning && !isPaused) {
    clearInterval(timer);
    isPaused = true;
  }
});

resumeButton.addEventListener("click", () => {
  if (isRunning && isPaused) {
    isPaused = false;
    timer = setInterval(() => {
      elapsedTime++;
      updateDisplay();
    }, 1000);
  }
});

resetButton.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  isPaused = false;
  elapsedTime = 0;
  updateDisplay();
});
