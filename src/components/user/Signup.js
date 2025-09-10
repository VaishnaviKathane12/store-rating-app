 
import { useState } from "react";
import api from "../../services/api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", address: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/signup", form);
    alert("User registered");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })}/>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })}/>
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })}/>
      <input placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })}/>
      <button type="submit">Signup</button>
    </form>
  );
}
