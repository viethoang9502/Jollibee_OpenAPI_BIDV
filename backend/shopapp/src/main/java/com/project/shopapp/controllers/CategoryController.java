package com.project.shopapp.controllers;

import com.project.shopapp.dtos.CategoryDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.script.Bindings;
import java.util.List;

@RestController
@RequestMapping("api/v1/categories")
public class CategoryController {
    @GetMapping("")
    public ResponseEntity<String> getallCategories(
            @RequestParam("page") int page,
            @RequestParam("limit") int limit
    ){
        return ResponseEntity.ok(String.format("getAllCategories, page = %d, limit = %d", page, limit));
    }
    @PostMapping("")
    public ResponseEntity<?> insertCategories(
            @Valid @RequestBody CategoryDTO categoryDTO,
            BindingResult result
            ) {
        if (result.hasErrors()) {
            List<String> errorMessage = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return ResponseEntity.badRequest().body(errorMessage);
        }
        return ResponseEntity.ok("this is insertCategory"+categoryDTO);
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> insertcategories(@PathVariable long id){
            return ResponseEntity.ok("this is insertCategoties with id ="+ id);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletecategories(@PathVariable long id){
        return ResponseEntity.ok("DeleteCategories with id = "+ id);
    }
}
