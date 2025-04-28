import React, { useState } from "react";
import { loginUser } from "../api";
import { setToken } from "../auth";

const LoginModal = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser(email, password);
      setToken(token);
      onSuccess();
    } catch (err) {
      setError("Login Failed");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" style={{ width: "100%" }}>
            Submit
          </button>
        </form>
        <button
          onClick={onClose}
          style={{
            marginTop: "1rem",
            backgroundColor: "#e53e3e",
            width: "100%",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
