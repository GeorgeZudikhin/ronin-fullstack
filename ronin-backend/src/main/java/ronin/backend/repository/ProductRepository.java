package ronin.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ronin.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);

    @Query(value = "SELECT * FROM product WHERE name = '\" + :name + \"'", nativeQuery = true)
    @Deprecated
    List<Product> findByUnsafeName(String name);

}
