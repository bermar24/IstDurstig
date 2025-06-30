package istdurstig.repository;

import istdurstig.model.Plant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantRepository extends MongoRepository<Plant, String> {
    List<Plant> findByIdIn(List<String> ids);
    
    @Query("{ 'schedule.lastWatered': { $lte: ?0 } }")
    List<Plant> findPlantsNeedingWater(String date);
}