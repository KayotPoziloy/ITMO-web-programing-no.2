package webLab2;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");

        double xValue = Double.parseDouble(x);
        double yValue = Double.parseDouble(y);
        double rValue = Double.parseDouble(r);

        // добавить обработчик исключений

        boolean isInside = checkCircle(xValue, yValue, rValue)
                || checkRectangle(xValue, yValue, rValue)
                || checkTriangle(xValue, yValue, rValue);

        CheckResult result = new CheckResult(xValue, yValue, rValue, isInside);

        ServletContext servletContext = getServletContext();
        List<CheckResult> resultsList = (List<CheckResult>) servletContext.getAttribute("resultsList");

        if (resultsList == null) {
            resultsList = new ArrayList<>();
        }

        resultsList.add(result);
        servletContext.setAttribute("resultsList", resultsList);
    }

    private boolean checkCircle(double x, double y, double r) {
        return x >= 0 && y <= 0 && x * x + y * y <= r * r;
    }

    private boolean checkRectangle(double x, double y, double r) {
        return x <= 0 && x >= -r/2 && y <= r && y >= 0;
    }

    private boolean checkTriangle(double x, double y, double r) {
        return x >= 0 && y >= 0 && y <= -4*x + r;
    }
}
