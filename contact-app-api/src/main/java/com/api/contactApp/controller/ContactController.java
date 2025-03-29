package com.api.contactApp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.contactApp.service.ContactService;
import com.api.contactApp.model.Contact; // Ensure this is the correct package for the Contact class

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ContactController {
    private final ContactService service;

    @GetMapping
    public List<Contact> getAll() { 
        return service.getAll(); 
    }

    @PostMapping
    public Contact add(@RequestBody Contact c) {
         return service.add(c); 
    }

    @PutMapping("/{id}")
    public Contact update(@PathVariable Long id, @RequestBody Contact c) {
        return service.update(id, c);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { 
        service.delete(id); 
    }
}
