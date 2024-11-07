import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

interface LoginPageProps {
  isAuthenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ isAuthenticated, setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const { setEmail } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", "12332"); // Örnek token
        localStorage.setItem("email", username);  // Email'i kaydedin
        setEmail(username);  // Email bilgisini context ile güncelleyin
        setAuthenticated(true);
        navigate("/home");
        setErrorText("");
      } else {
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      setErrorText("Eposta veya şifre hatalı");
      console.error("Giriş sırasında hata oluştu", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container className="login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
              <Form.Label className="errorText">{errorText}</Form.Label>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
