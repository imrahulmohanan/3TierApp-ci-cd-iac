"use client";

import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "@/services/contactService";
import { useRouter } from "next/navigation";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getContacts().then(setContacts);
  }, []);

  const handleDelete = async (id) => {
    await deleteContact(id);
    setContacts(await getContacts());
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">📇 My Contacts</h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push("/contacts/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ➕ Add Contact
          </button>
        </div>

        {contacts.length === 0 ? (
          <p className="text-center text-gray-500">No contacts found.</p>
        ) : (
          <ul className="space-y-4">
            {contacts.map((c) => (
              <li
                key={c.id}
                className="flex justify-between items-center bg-gray-50 border p-4 rounded shadow-sm"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">{c.name}</p>
                  <p className="text-sm text-gray-600">{c.email}</p>
                  <p className="text-sm text-gray-600">{c.phone}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/contacts/${c.id}/edit`)}
                    className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
