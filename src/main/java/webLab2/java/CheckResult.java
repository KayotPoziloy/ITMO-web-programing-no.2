package webLab2.java;

import java.math.BigDecimal;

public class CheckResult {
    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;
    private boolean isInside;

    public CheckResult(BigDecimal x, BigDecimal y, BigDecimal r, boolean isInside) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isInside = isInside;
    }

    public BigDecimal getX() {
        return x;
    }

    public void setX(BigDecimal x) {
        this.x = x;
    }

    public BigDecimal getY() {
        return y;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public BigDecimal getR() {
        return r;
    }

    public void setR(BigDecimal r) {
        this.r = r;
    }

    public boolean isInside() {
        return isInside;
    }

    public void setInside(boolean inside) {
        isInside = inside;
    }
}

