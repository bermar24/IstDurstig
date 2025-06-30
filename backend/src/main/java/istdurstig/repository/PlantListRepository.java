package istdurstig.repository;

import istdurstig.model.PlantList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantListRepository extends MongoRepository<PlantList, String> {
    List<PlantList> findByOwnerId(String ownerId);
    
    @Query("{ $or: [ { 'ownerId': ?0 }, { 'collaboratorIds': ?0 } ] }")
    List<PlantList> findByOwnerIdOrCollaboratorIdsContaining(String userId);
}