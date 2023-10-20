<%--
  Created by IntelliJ IDEA.
  User: yakho
  Date: 17.10.2023
  Time: 20:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Лабораторная №2</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
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
                <canvas id="canvas_plot" width="500" height="500"></canvas>
                <script src="js/index.js"></script>
            </td>
        </tr>
        <tr class="header">
            <td>
                <table border="1" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <!--ячейка ввода данных-->
                        <td>
                            <form action="controller" method="get">

                                <div>
                                    <label>Введите значение X:</label>
                                    <label><input type="button" name="x" value="-2" required></label>
                                    <label><input type="button" name="x" value="-1.5"></label>
                                    <label><input type="button" name="x" value="-1"></label>
                                    <label><input type="button" name="x" value="-0.5"></label>
                                    <label><input type="button" name="x" value="0"></label>
                                    <label><input type="button" name="x" value="0.5"></label>
                                    <label><input type="button" name="x" value="1"></label>
                                    <label><input type="button" name="x" value="1.5"></label>
                                    <label><input type="button" name="x" value="2"></label>
                                </div>

                                <div id="errorX" class="error"></div>
                                <div>
                                    <label for="y">Введите значение Y (от -5 до 3):</label>
                                    <input type="text" name="y" id="y" required>
                                </div>
                                <div id="errorY" class="error"></div>
                                <div>
                                    <label>Введите значение R (от 2 до 5):</label>
                                    <label><input type="checkbox" name="r" value="1">1</label>
                                    <label><input type="checkbox" name="r" value="2">2</label>
                                    <label><input type="checkbox" name="r" value="3">3</label>
                                    <label><input type="checkbox" name="r" value="4">4</label>
                                    <label><input type="checkbox" name="r" value="5">5</label>

                                <%--                                    <input type="text" name="r" id="r" required>--%>
                                </div>
                                <div id="errorR" class="error"></div>
                                <input type="submit" value="Проверить">
<%--                                <a href="JSP/results.jsp" style="padding-left: 20px">Таблица</a>--%>
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
