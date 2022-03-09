package com.wmanager.springbootbackend.controller;

import com.wmanager.springbootbackend.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.wmanager.springbootbackend.repository.ProductRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@Data
@AllArgsConstructor
@RestController
@RequestMapping("api/")
public class ProductController {


    private final ProductRepository productRepository;

    @GetMapping("products")
    public List<Product> getProducts(){
        return this.productRepository.findAll();
    }
}
