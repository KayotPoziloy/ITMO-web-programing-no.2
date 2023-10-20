package webLab2;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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
        String r = request.getParameter("r");


        // проверка, переданы ли значения
        if (x != null && y != null && r != null && checkX(x) && checkY(y) && checkR(r)) {
            // если да, то перенаправляется на /AreaCheckServlet
            request.getRequestDispatcher("/AreaCheckServlet").forward(request, response);
        } else {
            // если нет, то перенаправляется обратно
            request.getRequestDispatcher("/index.jsp");
        }
    }

    // Проверка значения X
    public boolean checkX(String x) {
        String[] validXValues = {"-2", "-1.5", "-1", "-0.5", "0", "0.5", "1", "1.5", "2"};
        try {
            return Arrays.asList(validXValues).contains(x);
        } catch (NumberFormatException e) {
            return false;
        }
    }

    // Проверка значения Y
    public boolean checkY(String y) {
        try {
            double yValue = Double.parseDouble(y);
            return yValue >= -5 && yValue <= 3;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    // Проверка значения R
    public boolean checkR(String r) {
        String[] validRValues = {"1", "2", "3", "4", "5"};
        try {
            return Arrays.asList(validRValues).contains(r);
        } catch (NumberFormatException e) {
            return false;
        }

    }
}
