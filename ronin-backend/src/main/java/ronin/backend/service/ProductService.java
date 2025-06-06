package ronin.backend.service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ronin.backend.entity.Product;
import ronin.backend.repository.ProductRepository;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    private DataSource dataSource;

    public List<Product> searchProductsUnsafe(String name) {
        List<Product> results = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
                Statement stmt = conn.createStatement()) {

            String query = "SELECT * FROM product WHERE name = '" + name + "'";
            ResultSet rs = stmt.executeQuery(query);

            while (rs.next()) {
                Product p = new Product();
                p.setName(rs.getString("name"));
                results.add(p);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return results;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        return productRepository.findById(id).map(product -> {
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            product.setStock(productDetails.getStock());
            product.setSellerId(productDetails.getSellerId());
            product.setCategoryId(productDetails.getCategoryId());
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
