function validateForm() {
    // Получаем значения X, Y, R из формы
    let xValue = document.querySelector('input[name="x"]:checked');

    let yValue = document.getElementById("y").value;
    yValue = yValue.replace(',', '.');
    let rValue = document.getElementById("r").value;
    rValue = rValue.replace(',', '.');

    let errorX = document.getElementById("errorX");
    let errorY = document.getElementById("errorY");
    let errorR = document.getElementById("errorR");

    errorX.textContent = ""; // Сбрасываем текст ошибок
    errorY.textContent = "";
    errorR.textContent = "";


    // Проверка на некорректные значения
    if (!xValue) {
        errorX.textContent = "Выберите значение X";
        return false; // Блокируем отправку формы, если не отмечен ни один флажок
    }

    xValue = parseFloat(xValue.value);

    if (isNaN(xValue) || xValue < -2 || xValue > 2) {
        errorX.textContent = "Введите корректное значение X (от -2 до 2).";
        return false;
    }

    if (isNaN(yValue) || yValue < -5 || yValue > 3) {
        errorY.textContent = "Введите корректное значение Y (от -5 до 3).";
        return false;
    }

    if (isNaN(rValue) || rValue < 1 || rValue > 5) {
        errorR.textContent = "Введите корректное значение R (от 1 до 5).";
        return false;
    }

    return {x: xValue, y: yValue, r: rValue};
}