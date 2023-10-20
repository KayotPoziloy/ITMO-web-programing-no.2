<%--
  Created by IntelliJ IDEA.
  User: yakho
  Date: 18.10.2023
  Time: 20:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Результаты</title>
</head>
<body>
    Отображение результатов
    <table border="1" cellpadding="0" cellspacing="0" width="80%" class="result-table" id="resultTable">
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Результат</th>
            <th>Время</th>
            <th>Время выполнения</th>
        </tr>
    </table>
    <button id="clear">Очистить таблицу</button>
    <a href="../html/index.html">Вернуться на главную страницу</a>
    <script src="../js/result.js"></script>
</body>
</html>
