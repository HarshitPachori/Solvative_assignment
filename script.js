const stopwatchDisplay = document.getElementById("stopwatch_display");
const startBtn = document.getElementById("startPauseResume");
const stopBtn = document.getElementById("stop");
// const pauseBtn = document.getElementById("pause");
// const resumeBtn = document.getElementById("resume");
const resetBtn = document.getElementById("reset");
const lapsList = document.getElementById("laps_list");
const lapsDisplay = document.getElementById("laps_display");

let timer;
let currentStopwatchTime = 0;
let isStarted = false;
let isPaused = false;
let lapTime = "";

startBtn.addEventListener("click", startPauseResumeWatchHandler);
stopBtn.addEventListener("click", stopWatchHandler);
resetBtn.addEventListener("click", resetWatchHandler);

function calculateLapTime() {
  const hours = String(Math.floor(currentStopwatchTime / 3600)).padStart(
    2,
    "0"
  );
  const minutes = String(
    Math.floor((currentStopwatchTime % 3600) / 60)
  ).padStart(2, "0");
  const seconds = String(Math.floor(currentStopwatchTime % 60)).padStart(
    2,
    "0"
  );
  lapTime = `${hours}h:${minutes}m:${seconds}s`;
}

function displayCurrentTime() {
  calculateLapTime();
  stopwatchDisplay.textContent = lapTime;
}

function incrementTime() {
  currentStopwatchTime++;
  displayCurrentTime();
}

function startPauseResumeWatchHandler() {
  if (!isStarted) {
    startWatchHandler();
  } else if (!isPaused) {
    pauseWatchHandler();
  } else {
    resumeWatchHandler();
  }
}

function startWatchHandler() {
  isStarted = true;
  isPaused = false;
  startBtn.textContent = "Pause";
  timer = setInterval(incrementTime, 1000);
}

function pauseWatchHandler() {
  isPaused = true;
  clearInterval(timer);
  startBtn.textContent = "Resume";
}

function resumeWatchHandler() {
  isPaused = false;
  startBtn.textContent = "Pause";
  timer = setInterval(incrementTime, 1000);
}

function stopWatchHandler() {
  if (isStarted) {
    clearInterval(timer);
    lapsDisplay.style.display = "block";
    calculateLapTime();
    const lapElement = document.createElement("li");
    lapElement.textContent = lapTime;
    lapsList.appendChild(lapElement);
    currentStopwatchTime = 0;
    displayCurrentTime();
    isStarted = false;
    isPaused = false;
    startBtn.textContent = "Start";
  }
}

function resetWatchHandler() {
  clearInterval(timer);
  currentStopwatchTime = 0;
  isStarted = false;
  isPaused = false;
  startBtn.textContent = "Start";
  displayCurrentTime();
  clearLaps();
}

function clearLaps() {
  lapsDisplay.style.display = "none";
  lapsList.innerHTML = "";
}
