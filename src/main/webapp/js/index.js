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
    const y = -(event.offsetY - yAxis);
    // let r = document.getElementById("rValue").value;

    rInitialize()
    const rSplit = 200; // один r это 200 px на полотне
    // пусть x = 160px rSplit = 200px x = 160/200 = 0,8
    // пусть x = 160/200*r = 0,8*r
    let xValue = x / rSplit; // получаем x относительно r в пикселях
    let yValue = y / rSplit;
    // console.log("относительный x: " + xValue);
    // console.log("относительный y: " + yValue);
    let errorR = document.getElementById("errorR");

    let cnt = 0;
    // проходимся по массиву
    rArray.forEach(function (r) {
        if (r !== '') {
            let xValue = x / rSplit; // получаем x относительно r в пикселях
            let yValue = y / rSplit; // получаем y относительно r в пикселях
            errorR.textContent = "";
            xValue = xValue * r; // получаем x относительно заданного r
            yValue = yValue * r; // получаем x относительно заданного r
            // console.log("x: " + x + "y: " + y + "r: " + r);
            // console.log("x относительно r " + xValue + " y относительно r " + yValue);
            submitForm(xValue, yValue, r, true); // отправляем форму
        } else {
            cnt++;
        }
        if (cnt === 4) {
            errorR.textContent = "Введите корректное значение R (от 2 до 5)."; // доработать ошибку
        }
    });

    return {x: xValue, y: yValue, r: r};
}
let resultsArray = [];
// функция сохраняет все результаты в массив и отрисовывает точки по результатам которые есть
function arraySave(results) {
    results.forEach(function (result) {
        resultsArray.push(result);
    });

    clearCanvas();
    // в функцию dot передаются результаты по одному
    dotSend();
}
// функция отрисовывает координаты
function dot(result) {
    const rSplit = 200; // один r это 200 px на полотне
    let x = result.x;
    let y = result.y;

    rArray.forEach(function (r) {
        if (r !== "") {
            // console.log("функция dot " + x, y, r);
            let xValue = x / r * rSplit + xAxis - 2; // получили координату в пикселях относительно левого верхнего угла канваса
            let yValue = - (y / r * rSplit - yAxis + 2);
            // console.log("функция dot координаты в пикселях ", xValue, yValue);

            ctx.beginPath();
            ctx.fillStyle = "red"
            ctx.fillRect(xValue, yValue, 4, 4,)
            ctx.closePath();
        }
    })
}

let rArray; // массив с r, указанными на данный момент
// функция отправляет r для отрисовки
function rInitialization() {
    clearCanvas();
    rInitialize();
    dotSend();
}
// функция перебирает и отправляет результаты из resultsArray в функцию dot
function dotSend() {
    resultsArray.forEach(function (result) {
        dot(result);
        console.log(result);
    });
}
// функция инициализирует r
function rInitialize() {
    let r2 = document.getElementById("rValue2").value;
    let r3 = document.getElementById("rValue3").value;
    let r4 = document.getElementById("rValue4").value;
    let r5 = document.getElementById("rValue5").value;
    // добавляем все r в массив
    rArray = [r2, r3, r4, r5];
    console.log(rArray);
}

// функция обновляет канвас
function clearCanvas() {
    ctx.clearRect(0, 0, canvasPlotWidth, canvasPlotHeight);
    axis();
    zone();
    r();
}
clearCanvas();
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
