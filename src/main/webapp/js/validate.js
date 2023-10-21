// Функция, получающая значения X, Y, R из формы на index.jsp
function getFormValues() {
    let xValue = document.querySelector('input[name="x"]:checked').value;
    xValue = xValue.replace(',', '.');
    let yValue = document.getElementById("y").value;
    yValue = yValue.replace(',', '.');
    let rValue = document.getElementById("r").value;
    rValue = rValue.replace(',', '.');
}

// Функция для валидации значений X, Y и R
function validateForm(xValue, yValue, rValue) {
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

    if (isNaN(rValue) || rValue < 2 || rValue > 5) {
        errorR.textContent = "Введите корректное значение R (от 2 до 5).";
        return false;
    }

    return true;
}

function submitForm(xValue, yValue, rValue) {
    // Формируем URL с параметрами
    let url = "/controller?x=" + xValue + "&y=" + yValue + "&r=" + rValue;

    // Создаем XMLHttpRequest объект
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            // обработка успешного ответа от сервера
            // обновление таблицы результатов на текущей странице
            let resultTable = document.getElementById("resultTable");
            let newRow = resultTable.insertRow(1); // вставляем новую строку в таблицу
            let xCell = newRow.insertCell(0); // Создаем ячейку X
            let yCell = newRow.insertCell(1); // Создаем ячейку Y
            let rCell = newRow.insertCell(2); // Создаем ячейку R
            let resultCell = newRow.insertCell(3); // Создаем ячейку результата

            xCell.innerHTML = xValue;
            yCell.innerHTML = yValue;
            rCell.innerHTML = rValue;
            resultCell.innerHTML = "Да";

        } else {
            console.error("Ошибка при отправке данных на сервер");
        }
    }

    xhr.send();
}

// Главная функция, которая вызывает остальные функции и управляет процессом
function processForm() {
    let {x, y, r} = getFormValues();

    if (validateForm(x, y, r)) {
        submitForm(x, y, r)
    }
}