// Функция, получающая значения X, Y, R из формы на index.jsp
function getFormValues() {

    let xValue = document.getElementById("xValue").value;
    xValue = xValue.replace(',', '.');
    let yValue = document.getElementById("y").value;
    yValue = yValue.replace(',', '.');
    // let rValue = document.getElementsByName("r").value;
    let rCheckboxes = document.querySelectorAll('input[name="r"]:checked');
    let rValues = Array.from(rCheckboxes).map(checkbox => checkbox.value);

    console.log("X:", xValue);
    console.log("Y:", yValue);
    console.log("R:", rValues);

    return {x: xValue, y: yValue, r: rValues};
}

// Функция для валидации значений X, Y и R
function validateForm(xValue, yValue, rValues) {
    let errorX = document.getElementById("errorX");
    let errorY = document.getElementById("errorY");
    let errorR = document.getElementById("errorR");

    // Сбрасываем текст ошибок
    errorX.textContent = "";
    errorY.textContent = "";
    errorR.textContent = "";

    if (isNaN(xValue) || xValue < -2 || xValue > 2) {
        errorX.textContent = "Введите корректное значение X (от -2 до 2).";
        return false;
    }

    if (isNaN(yValue) || yValue < -5 || yValue > 3) {
        errorY.textContent = "Введите корректное значение Y (от -5 до 3).";
        return false;
    }

    for (let rValue of rValues) {
        if (isNaN(rValue) || rValue < 2 || rValue > 5) {
            errorR.textContent = "Введите корректное значение R (от 2 до 5).";
            return false;
        }
    }

    return true;
}

function submitForm(xValue, yValue, rValues) {
    // Формируем URL с параметрами
    let url = "/webLab2_war_exploded2/controller?" +
        "x=" + xValue + "&y=" + yValue + "&" + rValues.map(r => `r=${r}`).join('&');


    // Создаем XMLHttpRequest объект
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            // обработка успешного ответа от сервера
            let result = JSON.parse(xhr.responseText);
            updateResultTable(result);
        } else {
            console.error("Ошибка при отправке данных на сервер " + xhr.status);
        }
    }

    xhr.send();
}

function updateResultTable(result) {
    let resultTable = document.getElementById("resultTable");
    let newRow = resultTable.insertRow(1);
    let xCell = newRow.insertCell(0);
    let yCell = newRow.insertCell(1);
    let rCell = newRow.insertCell(2);
    let resultCell = newRow.insertCell(3);

    xCell.innerHTML = result.x;
    yCell.innerHTML = result.y;
    rCell.innerHTML = result.r;
    resultCell.innerHTML = result.isInside ? "Да" : "Нет";
}

// Главная функция, которая вызывает остальные функции и управляет процессом
function processForm() {
    let {x, y, r} = getFormValues();

    if (validateForm(x, y, r)) {
        submitForm(x, y, r)
    }
}