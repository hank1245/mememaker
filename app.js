const canvas = document.querySelector("canvas");
const colorOptions = document.getElementsByClassName("color");
const lineRange = document.querySelector(".line-range");
const colorInput = document.getElementById("color-input");
const modeBtn = document.querySelector(".mode");
const destroyBtn = document.querySelector(".destroy");
const eraseBtn = document.querySelector(".erase");

const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineRange.value;
let isPainting = false;
let isFilling = false;

const onMousemove = (e) => {
  const { offsetX, offsetY } = e;
  if (isPainting) {
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(offsetX, offsetY);
};
const onMousedown = (e) => {
  ctx.beginPath();
  isPainting = true;
};
const onMouseup = (e) => {
  isPainting = false;
};

const cancelPainting = (e) => {
  isPainting = false;
};

const onChangeRange = (e) => {
  ctx.beginPath();
  ctx.lineWidth = e.target.value;
};

const onColorClick = (e) => {
  const selected = e.target.dataset.color;
  colorInput.value = selected;
  ctx.strokeStyle = selected;
  ctx.fillStyle = selected;
};

const onColorChange = (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.dataset.color;
};

const changeMode = (e) => {
  isFilling = !isFilling;
  if (isFilling) {
    modeBtn.innerText = "Draw";
  } else {
    modeBtn.innerText = "Fill";
  }
};

const fillCanvas = () => {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = colorInput.value;
    ctx.fill();
  }
};

const onErase = () => {
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
  isFilling = false;
  colorInput.value = "#ffffff";
};

const onDestroy = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

canvas.addEventListener("mousemove", onMousemove);
canvas.addEventListener("mousedown", onMousedown);
canvas.addEventListener("mouseup", onMouseup);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", fillCanvas);

for (let color of colorOptions) {
  color.addEventListener("click", onColorClick);
}

lineRange.addEventListener("change", onChangeRange);
colorInput.addEventListener("change", onColorChange);
modeBtn.addEventListener("click", changeMode);
destroyBtn.addEventListener("click", onDestroy);
eraseBtn.addEventListener("click", onErase);
