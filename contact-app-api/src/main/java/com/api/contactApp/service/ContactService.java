package com.api.contactApp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.api.contactApp.model.Contact;
import com.api.contactApp.repository.ContactRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContactService {
    private final ContactRepository repo;

    public List<Contact> getAll() { 
        return repo.findAll(); 
    }
    
    public Contact add(Contact c) { 
        return repo.save(c);
    }

    public Contact update(Long id, Contact c) {
        return repo.findById(id).map(existing -> {
            existing.setName(c.getName());
            existing.setEmail(c.getEmail());
            existing.setPhone(c.getPhone());
            return repo.save(existing);
        }).orElse(null);
    }

    public void delete(Long id) { 
        repo.deleteById(id); 
    }
}

