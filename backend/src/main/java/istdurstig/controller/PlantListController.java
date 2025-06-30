package istdurstig.controller;

import istdurstig.dto.PlantListRequest;
import istdurstig.dto.ShareListRequest;
import istdurstig.model.PlantList;
import istdurstig.security.UserPrincipal;
import istdurstig.service.PlantListService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/plant-lists")
public class PlantListController {

    @Autowired
    private PlantListService plantListService;

    @GetMapping
    public ResponseEntity<List<PlantList>> getAllPlantLists(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<PlantList> plantLists = plantListService.getAllPlantListsForUser(userPrincipal.getId());
        return ResponseEntity.ok(plantLists);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlantList> getPlantListById(@PathVariable String id,
                                                      @AuthenticationPrincipal UserPrincipal userPrincipal) {
        PlantList plantList = plantListService.getPlantListById(id, userPrincipal.getId());
        return ResponseEntity.ok(plantList);
    }

    @PostMapping
    public ResponseEntity<PlantList> createPlantList(@Valid @RequestBody PlantListRequest plantListRequest,
                                                     @AuthenticationPrincipal UserPrincipal userPrincipal) {
        PlantList plantList = plantListService.createPlantList(plantListRequest, userPrincipal.getId());
        return ResponseEntity.ok(plantList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlantList> updatePlantList(@PathVariable String id,
                                                     @Valid @RequestBody PlantListRequest plantListRequest,
                                                     @AuthenticationPrincipal UserPrincipal userPrincipal) {
        PlantList plantList = plantListService.updatePlantList(id, plantListRequest, userPrincipal.getId());
        return ResponseEntity.ok(plantList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlantList(@PathVariable String id,
                                             @AuthenticationPrincipal UserPrincipal userPrincipal) {
        plantListService.deletePlantList(id, userPrincipal.getId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/plants/{plantId}")
    public ResponseEntity<PlantList> addPlantToList(@PathVariable String id,
                                                    @PathVariable String plantId,
                                                    @AuthenticationPrincipal UserPrincipal userPrincipal) {
        PlantList plantList = plantListService.addPlantToList(id, plantId, userPrincipal.getId());
        return ResponseEntity.ok(plantList);
    }

    @DeleteMapping("/{id}/plants/{plantId}")
    public ResponseEntity<PlantList> removePlantFromList(@PathVariable String id,
                                                         @PathVariable String plantId,
                                                         @AuthenticationPrincipal UserPrincipal userPrincipal) {
        PlantList plantList = plantListService.removePlantFromList(id, plantId, userPrincipal.getId());
        return ResponseEntity.ok(plantList);
    }

    @PostMapping("/{id}/share")
    public ResponseEntity<PlantList> shareListWithUser(@PathVariable String id,
                                                       @Valid @RequestBody ShareListRequest shareRequest,
                                                       @AuthenticationPrincipal UserPrincipal userPrincipal) {
        PlantList plantList = plantListService.addCollaboratorByEmail(id, shareRequest.getEmail(), userPrincipal.getId());
        return ResponseEntity.ok(plantList);
    }

    @DeleteMapping("/{id}/collaborators/{userId}")
    public ResponseEntity<PlantList> removeCollaborator(@PathVariable String id,
                                                        @PathVariable String userId,
                                                        @AuthenticationPrincipal UserPrincipal userPrincipal) {
        PlantList plantList = plantListService.removeCollaborator(id, userId, userPrincipal.getId());
        return ResponseEntity.ok(plantList);
    }
}