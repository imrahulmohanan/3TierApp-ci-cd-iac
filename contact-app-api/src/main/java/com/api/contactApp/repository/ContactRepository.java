package com.api.contactApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.contactApp.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}

