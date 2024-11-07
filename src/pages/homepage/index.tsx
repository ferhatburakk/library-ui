import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleAddBook = () => {
    navigate("/addBook");
  };

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/" style={{ color: "white" }}>
              LibraryUI
            </Navbar.Brand>
            <Button variant="outline-light" onClick={handleAddBook} style={{ marginLeft: "10px" }}>
              Add Book
            </Button>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className="justify-content-end">
              <Nav>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* İçerik */}
      <main className="my-4 flex-grow-1">
        <Container style={{ color: "#212529" }}>
          <Outlet /> {/* Alt bileşenleri burada gösterecek */}
        </Container>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <Container>
          <p>&copy; 2023 LibraryUI. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;
