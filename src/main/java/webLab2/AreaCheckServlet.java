package webLab2;

import com.google.gson.JsonObject;
import webLab2.java.CheckResult;

import com.google.gson.Gson;

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
        String[] rArray = request.getParameterValues("r");

        double xValue = Double.parseDouble(x);
        double yValue = Double.parseDouble(y);

        ServletContext servletContext = getServletContext();
        List<CheckResult> resultList = (List<CheckResult>) servletContext.getAttribute("resultList");

        if (resultList == null) {
            resultList = new ArrayList<>();
        }

        CheckResult result = null;

        for (String r : rArray) {
            double rValue = Double.parseDouble(r);
            boolean isInside = checkCircle(xValue, yValue, rValue)
                    || checkRectangle(xValue, yValue, rValue)
                    || checkTriangle(xValue, yValue, rValue);

            result = new CheckResult(xValue, yValue, rValue, isInside);
            resultList.add(result);
            sendJson(result, response);
        }
        servletContext.setAttribute("resultList", resultList);

    }

    private JsonObject writeJson(CheckResult result) {
        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("x", result.getX());
        jsonResponse.addProperty("y", result.getY());
        jsonResponse.addProperty("r", result.getR());
        jsonResponse.addProperty("isInside", result.isInside());

        return jsonResponse;
    }

    private void  sendJson(CheckResult result, HttpServletResponse response) throws IOException {
        String json = new Gson().toJson(writeJson(result));
        response.setContentType("application/json");
        response.getWriter().write(json);
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