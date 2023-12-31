<%--
  Created by IntelliJ IDEA.
  User: yakho
  Date: 17.10.2023
  Time: 20:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Лабораторная №2</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
<script>
    function setXValue(x) {
        document.getElementById("xValue").value = x;
    }
    // принимаются и устанавливаются r
    // если r уже стоит то удаляется
    function setRValue(r) {
        let rVar = parseInt(r)
        const rValue2 = document.getElementById("rValue2").value;
        const rValue3 = document.getElementById("rValue3").value;
        const rValue4 = document.getElementById("rValue4").value;
        const rValue5 = document.getElementById("rValue5").value;
        if (rVar === 2) {
            if (rValue2 === "") {
                document.getElementById("rValue2").value = r;
            } else {
                document.getElementById("rValue2").value = "";
            }
        }
        if (rVar === 3) {
            if (rValue3 === "") {
                document.getElementById("rValue3").value = r;
            } else {
                document.getElementById("rValue3").value = "";
            }
        }
        if (rVar === 4) {
            if (rValue4 === "") {
                document.getElementById("rValue4").value = r;
            } else {
                document.getElementById("rValue4").value = "";
            }
        }
        if (rVar === 5) {
            if (rValue5 === "") {
                document.getElementById("rValue5").value = r;
            } else {
                document.getElementById("rValue5").value = "";
            }
        }
    }
</script>
<script src="js/validate.js"></script>

<body>

<table border="1" cellpadding="0" cellspacing="0" width="100%">
    <thead>
        <tr>
            <th colspan=2 class="header">Яхонтов Максим Витальевич P3220 Вариант 3013</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <canvas id="canvas_plot" width="500" height="500" onclick="checkPoint(event)"></canvas>
                <script src="js/index.js"></script>
            </td>
        </tr>
        <tr class="header">
            <td>
                <table border="1" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <!--ячейка ввода данных-->
                        <td>
                            <form action="javascript:void(0);" onsubmit="processForm();"> <%-- закрепить форму по верху а не по центру --%>

                                <div>
                                    <label>Введите значение X:</label>
                                        <button type="button" name="x" class="xButton" data-x="-2" onclick="setXValue('-2')">-2</button>
                                        <button type="button" name="x" class="xButton" data-x="-1.5" onclick="setXValue('-1.5')">-1.5</button>
                                        <button type="button" name="x" class="xButton" data-x="-1" onclick="setXValue('-1')">-1</button>
                                        <button type="button" name="x" class="xButton" data-x="-0.5" onclick="setXValue('-0.5')">-0.5</button>
                                        <button type="button" name="x" class="xButton" data-x="0" onclick="setXValue('0')">0</button>
                                        <button type="button" name="x" class="xButton" data-x="0.5" onclick="setXValue('0.5')">0.5</button>
                                        <button type="button" name="x" class="xButton" data-x="1" onclick="setXValue('1')">1</button>
                                        <button type="button" name="x" class="xButton" data-x="1.5" onclick="setXValue('1.5')">1.5</button>
                                        <button type="button" name="x" class="xButton" data-x="2" onclick="setXValue('2')">2</button>
                                    <input type="hidden" name="x" id="xValue" value="">
                                </div>

                                <div id="errorX" class="error"></div>
                                <div>
                                    <label for="y">Введите значение Y (от -5 до 3):</label>
                                    <input type="text" name="y" id="y" required>
                                </div>
                                <div id="errorY" class="error"></div>
                                <div>
                                    <label>Введите значение R (от 2 до 5):</label>
                                    <label><input type="checkbox" name="r" value="2" onclick="setRValue(2); rInitialization()">2</label>
                                    <label><input type="checkbox" name="r" value="3" onclick="setRValue(3); rInitialization()">3</label>
                                    <label><input type="checkbox" name="r" value="4" onclick="setRValue(4); rInitialization()">4</label>
                                    <label><input type="checkbox" name="r" value="5" onclick="setRValue(5); rInitialization()">5</label>
                                    <input type="hidden" name="r" id="rValue2" value="">
                                    <input type="hidden" name="r" id="rValue3" value="">
                                    <input type="hidden" name="r" id="rValue4" value="">
                                    <input type="hidden" name="r" id="rValue5" value="">
                                </div>
                                <div id="errorR" class="error"></div>
                                <input type="submit" value="Проверить">
                            </form>
                        </td>
                        <td>
                            Отображение результатов
                            <table border="1" cellpadding="0" cellspacing="0" width="80%" class="result-table" id="resultTable">
                                <tr>
                                    <th>X</th>
                                    <th>Y</th>
                                    <th>R</th>
                                    <th>Результат</th>
                                </tr>
                                <c:forEach items="${resultsList}" var="result">
                                    <tr>
                                        <td>${result.x}</td>
                                        <td>${result.y}</td>
                                        <td>${result.r}</td>
                                        <td>${result.isInside ? 'Да' : 'Нет'}</td>
                                    </tr>
                                </c:forEach>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </tbody>
</table>

</body>
</html>
