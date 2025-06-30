package istdurstig.controller;

import istdurstig.dto.PlantRequest;
import istdurstig.dto.CareEventRequest;
import istdurstig.model.Plant;
import istdurstig.security.UserPrincipal;
import istdurstig.service.PlantService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/plants")
public class PlantController {
    
    @Autowired
    private PlantService plantService;

    @GetMapping
    public ResponseEntity<List<Plant>> getAllPlants(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Plant> plants = plantService.getAllPlantsForUser(userPrincipal.getId());
        return ResponseEntity.ok(plants);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plant> getPlantById(@PathVariable String id, 
                                            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Plant plant = plantService.getPlantById(id, userPrincipal.getId());
        return ResponseEntity.ok(plant);
    }

    @PostMapping
    public ResponseEntity<Plant> createPlant(@Valid @RequestBody PlantRequest plantRequest,
                                           @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Plant plant = plantService.createPlant(plantRequest, userPrincipal.getId());
        return ResponseEntity.ok(plant);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Plant> updatePlant(@PathVariable String id,
                                           @Valid @RequestBody PlantRequest plantRequest,
                                           @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Plant plant = plantService.updatePlant(id, plantRequest, userPrincipal.getId());
        return ResponseEntity.ok(plant);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlant(@PathVariable String id,
                                       @AuthenticationPrincipal UserPrincipal userPrincipal) {
        plantService.deletePlant(id, userPrincipal.getId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/care-events")
    public ResponseEntity<Plant> addCareEvent(@PathVariable String id,
                                            @Valid @RequestBody CareEventRequest careEventRequest,
                                            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Plant plant = plantService.addCareEvent(id, careEventRequest, userPrincipal.getId());
        return ResponseEntity.ok(plant);
    }

    @GetMapping("/due-today")
    public ResponseEntity<List<Plant>> getPlantsDueToday(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Plant> plants = plantService.getPlantsDueToday(userPrincipal.getId());
        return ResponseEntity.ok(plants);
    }
}