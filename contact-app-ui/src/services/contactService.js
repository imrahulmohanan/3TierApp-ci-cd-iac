const API_BASE = "http://localhost:8080/api/contacts";

export const getContacts = async () => {
  const res = await fetch(API_BASE);
  return res.json();
};

export const getContact = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`);
  return res.json();
};

export const addContact = async (contact) => {
  return fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
};

export const updateContact = async (id, contact) => {
  return fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
};

export const deleteContact = async (id) => {
  return fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
};

export const patchContact = async (id, updates) => {
  return fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
};
