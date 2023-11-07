package webLab2;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.Arrays;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {
    /**
     * Обрабатывает GET-запросы
     * @param request - объект от клиента
     * @param response - ответ клиенту
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String[] rArray = request.getParameterValues("r");

        boolean isValid = false;
        for (String r : rArray) {
            // проверка, переданы ли значения
            if (x != null && y != null && checkX(x) && checkY(y) && checkR(r)) {
                isValid = true;
            } else {
                break;
            }
        }

        if (isValid) {
            // если да, то перенаправляется на /AreaCheckServlet
            request.getRequestDispatcher("/AreaCheckServlet").forward(request, response);
        } else {
            // если нет, то перенаправляется обратно
            request.getRequestDispatcher("/index.jsp");
        }
    }

    // Проверка значения X
    public boolean checkX(String x) {
        try {
            BigDecimal xValue = new BigDecimal(x);
            // число сравнивается с -2 если оно меньше чем -2 возвращается -1,
            // если ровно -2 возвращается 0,
            // если больше -2 возвращается один
            return xValue.compareTo(BigDecimal.valueOf(-2)) >= 0 && xValue.compareTo(BigDecimal.valueOf(2)) <= 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    // Проверка значения Y
    public boolean checkY(String y) {
        try {
            BigDecimal yValue = new BigDecimal(y);
            return yValue.compareTo(BigDecimal.valueOf(-5)) >= 0 && yValue.compareTo(BigDecimal.valueOf(3)) <= 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    // Проверка значения R
    public boolean checkR(String r) {
        String[] validRValues = {"2", "3", "4", "5"};
        try {
            return Arrays.asList(validRValues).contains(r);
        } catch (NumberFormatException e) {
            return false;
        }

    }
}
