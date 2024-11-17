// CANVAS SETUP
const canvas = /** @type {HTMLCanvasElement} */ document.getElementById('canvas');
const ctx = /** @type {CanvasRenderingContext2D} */canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

ctx.strokeStyle = '#666666'
ctx.lineWidth = 2;

// DOM VARIABLES
const input1Percent = document.querySelector('.input1');
const input2Degree = document.querySelector('.input2');
const input3Ratio = document.querySelector('.input3');
const slider = document.querySelector('.slider');
const inputs = [input1Percent, input2Degree, input3Ratio];

// DRAWING FUNCTIONS
const drawGround = function () {
  ctx.beginPath();
  ctx.moveTo(0, 599)
  ctx.lineTo(800, 599);
  ctx.stroke();
}

const draw = function (percentSlope) {
  const length = 800; 
  const radians = Math.atan(percentSlope / 100);
  const deltaX = length * Math.cos(radians);
  const deltaY = length * Math.sin(radians);
  ctx.beginPath();
  ctx.moveTo(0, 599);
  ctx.lineTo(deltaX, 599 - deltaY);
  ctx.stroke();
}

// CALCULATION FUNCTIONS

const degreeToPercent = function (degree) {
  const rad = degree * (Math.PI / 180)
  const percent = (Math.tan(rad) * 100).toFixed(2)
  return percent;
};

const ratioToPercent = function (ratio) {
  const percent = ((1 / ratio) * 100).toFixed(2)
  return percent
};

const updateFromPercent = function (percent) {
  slider.value = percent;
  input2Degree.value = (Math.atan(percent / 100) * 180 / Math.PI).toFixed(2);
  input3Ratio.value = (1 / (percent / 100)).toFixed(2);
};
const updateFromDegree = function (degree) {
  slider.value = degreeToPercent(degree);
  input1Percent.value = degreeToPercent(degree);
  input3Ratio.value = (1 / Math.tan(degree * Math.PI / 180)).toFixed(2);
};
const updateFromRatio = function (ratio) {
  slider.value = ratioToPercent(ratio);
  input1Percent.value = ratioToPercent(ratio);
  input2Degree.value = (Math.atan(1 / ratio) * 180 / Math.PI).toFixed(2);
};
const updateFromSlider = function (percent) {
  input1Percent.value = percent;
  input2Degree.value = (Math.atan(percent / 100) * 180 / Math.PI).toFixed(2);
  input3Ratio.value = (1 / (percent / 100)).toFixed(2);
}

// INIT
const init = function () {
  drawGround();
  input2Degree.value = '';
  input1Percent.value = '';
  input3Ratio.value = '';
}

const clearSlopeLine = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawGround();
}

// INPUT EVENT LISTENERS
input1Percent.addEventListener('keyup', () => {
  const curVal = input1Percent.value;
  // Clearing Canvas
  clearSlopeLine();

  // Drawing and updating
  if (curVal) {
    draw(curVal);
    updateFromPercent(curVal);
  }
  else {
    init();
  }
})

input2Degree.addEventListener('keyup', () => {
  const curVal = input2Degree.value;
  const curPercent = degreeToPercent(curVal);
  // Clearing Canvas
  clearSlopeLine();

  // Drawing and updating
  if (curVal) {
    draw(curPercent);
    updateFromDegree(curVal);
  }
  else {
    init();
  }
})

input3Ratio.addEventListener('keyup', () => {
  const curVal = input3Ratio.value;
  const curPercent = ratioToPercent(curVal);
  // Clearing Canvas
  clearSlopeLine();

  // Drawing and updating
  if (curVal) {
    draw(curPercent);
    updateFromRatio(curVal);
  }
  else {
    init();
  }
})

init();

// reseting on click
// inputs.forEach(input=> input.addEventListener('click', () => init()))

slider.addEventListener('input', () => {
  const curVal = slider.value;
  // Clearing Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawGround();

  // Drawing and updating
  if (curVal) {
    draw(curVal);
    updateFromSlider(curVal);
  }
  else {
    init();
  }
})