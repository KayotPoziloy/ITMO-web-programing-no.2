const canvasPlot = document.getElementById('canvas_plot'); // инициализуем объект html
const ctx = canvasPlot.getContext('2d'); // задаем полотно в 2d

const canvasPlotWidth = canvasPlot.clientWidth;
const canvasPlotHeight = canvasPlot.clientHeight;

const lineWidth = 8;
const lineHeight = 2;

const xAxis = canvasPlotWidth / 2;
const yAxis = canvasPlotHeight / 2;

const radius = 200;

// Главные оси
ctx.beginPath();
// ось Y
ctx.moveTo(xAxis, 0);
ctx.lineTo(xAxis, canvasPlotHeight);
// ось X
ctx.moveTo(0, yAxis);
ctx.lineTo(canvasPlotWidth, yAxis);

ctx.stroke();
ctx.closePath();

// Отрисовка ОДЗ
ctx.beginPath();

ctx.arc(xAxis, yAxis, radius, 0, Math.PI/2);
ctx.lineTo(xAxis, yAxis);
ctx.fillStyle = "rgba(68,128,112,0.47)";
ctx.fill();

ctx.closePath();


ctx.beginPath();
var x1 = xAxis;
var y1 = yAxis;
var x2 = xAxis;
var y2 = yAxis - radius;
var x3 = xAxis + radius / 2;
var y3 = yAxis;

ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.lineTo(x3, y3);

ctx.fillStyle = "rgba(68,128,112,0.47)";
ctx.fill();
ctx.closePath();

ctx.beginPath();
var x1 = xAxis - radius / 2;
var y1 = yAxis;
var x2 = xAxis - radius / 2;
var y2 = yAxis - radius;
var x3 = xAxis;
var y3 = yAxis - radius;
var x4 = xAxis;
var y4 = yAxis;

ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.lineTo(x3, y3);
ctx.lineTo(x4, y4)

ctx.fillStyle = "rgba(68,128,112,0.47)";
ctx.fill();
ctx.closePath();


// Отрисовка значний R
ctx.beginPath();
ctx.fillStyle = "black";
ctx.font = '10px Arial';
ctx.fillText("X", canvasPlotWidth-10, yAxis);
ctx.fillText("Y", xAxis, + 10);

ctx.font = '15px Arial';
for (let i = radius; i >= -(radius); i -= radius / 2 ) {

    let litR = " -R"
    let litR2 = " -R/2"

    if (i < radius) {
        litR = " R"
        litR2 = " R/2"
    }

    if (i === radius / 2 || i === -radius / 2) {
        ctx.fillText(litR2, xAxis - i, yAxis);
        ctx.fillText(litR2, xAxis, yAxis + i);
    } else if (i === radius || i === -(radius)) {
        ctx.fillText(litR, xAxis - i, yAxis);
        ctx.fillText(litR, xAxis, yAxis + i);
    } else {
        continue;
    }
    ctx.fillRect(xAxis - i, yAxis - 4, lineHeight, lineWidth);
    ctx.fillRect(xAxis - 4, yAxis - i, lineWidth, lineHeight);

}
ctx.closePath();