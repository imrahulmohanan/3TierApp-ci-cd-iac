const API_BASE = "http://localhost:9090/api/contacts";

export const getContacts = async () => {
  const res = await fetch(API_BASE);
  console.log("calling API : "+API_BASE);
  return res.json();
};

export const getContact = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`);
  console.log("calling API : "+API_BASE);
  return res.json();
};

export const addContact = async (contact) => {
  console.log("calling API : "+API_BASE);
  return fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
};

export const updateContact = async (id, contact) => {
  console.log("calling API : "+API_BASE);
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
