package com.wmanager.springbootbackend;

import com.wmanager.springbootbackend.model.Product;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.wmanager.springbootbackend.repository.ProductRepository;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan(basePackages= {"com.wmanager"})
@AllArgsConstructor
public class SpringbootBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootBackendApplication.class, args);
	}

	private final ProductRepository productRepository;

	@Override
	public void run(String... args) throws Exception {
		this.productRepository.save(
				new Product("Goggins-Bot", 0, "Your artificial motivator! Are you feeling low? Goggins-Bot will shout at you until you pull yourself together."));
	}
}
