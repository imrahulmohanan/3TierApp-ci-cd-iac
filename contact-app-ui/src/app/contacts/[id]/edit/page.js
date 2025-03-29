"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getContact, updateContact } from "@/services/contactService";

export default function EditContactPage() {
  const router = useRouter();
  const { id } = useParams();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (id) {
      getContact(id).then(setContact);
    }
  }, [id]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateContact(id, contact);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">✏️ Edit Contact</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={contact.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}
