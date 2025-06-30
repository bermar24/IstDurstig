package istdurstig.model.enums;

public enum Frequency {
    FREQUENT(2),    // Every 2 days
    MEDIUM(5),      // Every 5 days
    RARE(10);       // Every 10 days

    private final int days;

    Frequency(int days) {
        this.days = days;
    }

    public int getDays() {
        return days;
    }
}