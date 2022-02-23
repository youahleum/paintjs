const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange2");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITAIL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;

//pixel modifier에 사이즈를 주지 않으면 선이 그려지지 않는다
//js가 html로부터 id값을 받아 element를 생성할때 css에서 width, height값을 받아오지 않아 그런것
//＜canvas id="jsCanvas" width="700" height="700"＞이렇게 html내부에 지정하여도 정상적으로 그림이 그려진다
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
//만약 이렇게 했는데 선 그릴때 이상하게 그려진다면 아래 방법으로 해보자
// canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
// canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITAIL_COLOR;
ctx.fillStyle = INITAIL_COLOR;

ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function onMouseDown(event) {
  painting = true;
}
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}
function handleCM(event) {
  console.log(event);
  event.preventDefault();
}
function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("mousedown", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
