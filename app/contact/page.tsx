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

      // Reset form
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
    <div style={{ padding: "2rem" }}>
      <h1>Contact Form</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />

        <input
          name="familyName"
          placeholder="Family Name"
          value={form.familyName}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="colony"
          placeholder="Colony"
          value={form.colony}
          onChange={handleChange}
        />

        <input
          name="landmark"
          placeholder="Landmark"
          value={form.landmark}
          onChange={handleChange}
        />

        <textarea
          name="issue"
          placeholder="Issue"
          value={form.issue}
          onChange={handleChange}
        />

        <input
          name="division"
          placeholder="Division"
          value={form.division}
          onChange={handleChange}
        />

        <input
          name="constituency"
          placeholder="Constituency"
          value={form.constituency}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
