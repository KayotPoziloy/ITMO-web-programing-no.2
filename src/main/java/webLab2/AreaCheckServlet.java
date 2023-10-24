package webLab2;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import webLab2.java.CheckResult;

import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;


@WebServlet("/AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String[] rArray = (String[]) request.getAttribute("rValues");

        double xValue = Double.parseDouble(x);
        double yValue = Double.parseDouble(y);

        List<CheckResult> resultsList = new ArrayList<>();

        for (String r : rArray) {
            double rValue = Double.parseDouble(r);
            boolean isInside = checkCircle(xValue, yValue, rValue)
                    || checkRectangle(xValue, yValue, rValue)
                    || checkTriangle(xValue, yValue, rValue);
            resultsList.add(new CheckResult(xValue, yValue, rValue, isInside));
        }

        request.setAttribute("resultsList", resultsList);

        JsonArray jsonArray = new JsonArray();
        for (CheckResult result : resultsList) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("x", result.getX());
            jsonObject.addProperty("y", result.getY());
            jsonObject.addProperty("r", result.getR());
            jsonObject.addProperty("isInside", result.isInside());
            jsonArray.add(jsonObject);
        }

        JsonObject jsonResponse = new JsonObject();
        jsonResponse.add("results", jsonArray);

        String json = new Gson().toJson(jsonResponse);

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