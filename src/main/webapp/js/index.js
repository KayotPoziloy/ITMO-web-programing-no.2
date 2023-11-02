const canvasPlot = document.getElementById('canvas_plot'); // инициализируем объект html
const ctx = canvasPlot.getContext('2d'); // задаем полотно в 2d

const canvasPlotWidth = canvasPlot.clientWidth;
const canvasPlotHeight = canvasPlot.clientHeight;

const lineWidth = 8;
const lineHeight = 2;

const xAxis = canvasPlotWidth / 2; // середина по горизонтали
const yAxis = canvasPlotHeight / 2; // середина по вертикали

const radius = 200;

function checkPoint(event) {
    // координата приходит относительно верхней левой точки в которой координата (0, 0)
    // потому, чтобы сместить точку к реальной координате относительно центра канваса нужно вычитать длину/2 и ширину/2
    const x = event.offsetX - xAxis;
    const y = event.offsetY - yAxis;

    console.log(x, y);
}

// Главные оси
function axis() {
    ctx.beginPath();
    // ось Y
    ctx.moveTo(xAxis, 0);
    ctx.lineTo(xAxis, canvasPlotHeight);
    // ось X
    ctx.moveTo(0, yAxis);
    ctx.lineTo(canvasPlotWidth, yAxis);

    ctx.stroke();
    ctx.closePath();
}
axis();

// Четверть круга
function circle() {
    ctx.beginPath();

    ctx.arc(xAxis, yAxis, radius, 0, Math.PI/2);
    ctx.lineTo(xAxis, yAxis);
    ctx.fillStyle = "rgba(68,128,112,0.47)";
    ctx.fill();

    ctx.closePath();

}

// Треугольник
function triangle() {

    ctx.beginPath();
    let x1 = xAxis;
    let y1 = yAxis;
    let x2 = xAxis;
    let y2 = yAxis - radius;
    let x3 = xAxis + radius / 2;
    let y3 = yAxis;

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);

    ctx.fillStyle = "rgba(68,128,112,0.47)";
    ctx.fill();
    ctx.closePath();
}

// Квадрат
function square() {
    ctx.beginPath();
    let x1 = xAxis - radius / 2;
    let y1 = yAxis;
    let x2 = xAxis - radius / 2;
    let y2 = yAxis - radius;
    let x3 = xAxis;
    let y3 = yAxis - radius;
    let x4 = xAxis;
    let y4 = yAxis;

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4)

    ctx.fillStyle = "rgba(68,128,112,0.47)";
    ctx.fill();
    ctx.closePath();
}

// Отрисовка ОДЗ
function zone() {
    circle();
    triangle();
    square();
}

zone();

// Отрисовка значений R
function r() {
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
}

r();