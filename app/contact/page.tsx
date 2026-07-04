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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!/^\d{10}$/.test(form.phone)) {
      setMessage("Phone number must be exactly 10 digits.");
      return;
    }

    if (form.issue.length > 2000) {
      setMessage("Issue cannot exceed 2000 characters.");
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <main style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Contact Form</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="familyName" placeholder="Family Name" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number (10 digits)" onChange={handleChange} required />
        <input name="colony" placeholder="Colony Name" onChange={handleChange} required />
        <input name="landmark" placeholder="Landmark" onChange={handleChange} required />
        <textarea name="issue" placeholder="Issue (max 2000 chars)" maxLength={2000} onChange={handleChange} required />
        <input name="division" placeholder="Division Name" onChange={handleChange} required />
        <input name="constituency" placeholder="Constituency Name" onChange={handleChange} required />

        <button type="submit" style={{ padding: "10px", background: "#ff6600", color: "white", borderRadius: "6px" }}>
          Submit
        </button>
      </form>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </main>
  );
}
