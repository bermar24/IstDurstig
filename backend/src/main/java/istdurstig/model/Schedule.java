package istdurstig.model;

import istdurstig.model.enums.Frequency;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {
    private Frequency frequency;
    private LocalDate lastWatered;

    public boolean needsWatering() {
        if (lastWatered == null) {
            return true;
        }
        return LocalDate.now().isAfter(lastWatered.plusDays(frequency.getDays()));
    }

    public LocalDate getNextWateringDate() {
        if (lastWatered == null) {
            return LocalDate.now();
        }
        return lastWatered.plusDays(frequency.getDays());
    }
}