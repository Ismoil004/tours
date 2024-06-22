package org.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve static files from /static/ directory in the classpath
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(3600);

        // Serve other resource directories
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("classpath:/resources/")
                .setCachePeriod(3600);

        registry.addResourceHandler("/public/**")
                .addResourceLocations("classpath:/public/")
                .setCachePeriod(3600);

        registry.addResourceHandler("/META-INF/resources/**")
                .addResourceLocations("classpath:/META-INF/resources/")
                .setCachePeriod(3600);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Set the default document
        registry.addViewController("/").setViewName("forward:/index.html");
    }
}
