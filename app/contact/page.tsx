"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    familyName: "",
    address: "",
    phone: "",
    colony: "",
    landmark: "",
    issue: "",
    division: "",
    constituency: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMessage(data.message || "Submitted successfully!");

      setForm({
        firstName: "",
        familyName: "",
        address: "",
        phone: "",
        colony: "",
        landmark: "",
        issue: "",
        division: "",
        constituency: "",
      });
    } catch (err) {
      setMessage("Error submitting form");
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Form</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <input
          name="familyName"
          placeholder="Family Name"
          value={form.familyName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <input
          name="colony"
          placeholder="Colony"
          value={form.colony}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <input
          name="landmark"
          placeholder="Landmark"
          value={form.landmark}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <textarea
          name="issue"
          placeholder="Issue"
          value={form.issue}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md h-24"
        />

        <input
          name="division"
          placeholder="Division"
          value={form.division}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <input
          name="constituency"
          placeholder="Constituency"
          value={form.constituency}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-3 rounded-md font-semibold"
        >
          Submit
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
