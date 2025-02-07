import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

//import { config } from "../config";

const OtpForm = () => {
  const baseUrl = "http://localhost:2000/api";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseUrl}/VerifyOTP`, // Replace with your login API endpoint
        formData
      );

      if (response.status === 200) {
        // Store JWT token in a cookie
        const token = response.data.token;

        // Set cookie with optional configurations
        const expires = new Date();
        expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // Expires in 7 days
        document.cookie = `token=${token}; path=/; expires=${expires.toUTCString()}; secure; SameSite=Strict;`;

        setStatus("Login successful! Redirecting...");
        setTimeout(() => navigate(`/`), 2000); // Redirect to dashboard
      }
    } catch (error) {
      setStatus(
        "Login failed: " + (error.response?.data?.message || "Server error")
      );
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="w-50 otpForm container py-5 ">
      <h2 className="text-center mb-4">Login</h2>

      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="w-100" variant="primary" type="submit">
          Submit
        </Button>
        <div className="text-center d-flex align-items-center justify-content-center">
          <span>Don't have an account?</span>
          <Button variant="link">
            <Link to="/login">Register</Link>
          </Button>
        </div>
      </Form>

      {status && <p>{status}</p>}
    </div>
  );
};

export default OtpForm;
