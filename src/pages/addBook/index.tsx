import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form, ListGroup } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

const AddBook: React.FC = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [saveStatus, setSaveStatus] = useState(false);
  const { email, setEmail } = useAuth();
  const apiKey = "****";

  // Email'i kontrol edip yüklenmesini sağlıyoruz
  useEffect(() => {
    if (!email) {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, [email, setEmail]);

  // email hala boşsa loading mesajı gösterelim
  if (!email) {
    return <div>Email yükleniyor...</div>;
  }

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: query,
            key: apiKey,
          },
        }
      );
      setBooks(response.data.items);
    } catch (error) {
      console.error("Kitap arama sırasında hata oluştu:", error);
    }
  };

  const handleBookAdd = async (book: any) => {
    const title = book.volumeInfo.title;
    const author = book.volumeInfo.authors?.join(", ");
    const isbn = book.volumeInfo.industryIdentifiers[0]?.identifier;

    try {
      const response = await axios.post("http://localhost:8080/api/loan/saveBookAndLoan", {
        bookDto: {
          title: title,
          author: author,
          isbn: isbn,
        },
        email: email,
      });

      if (response.status === 200) {
        setSaveStatus(true);
      }
    } catch (error) {
      console.error("Kitap ekleme sırasında hata oluştu:", error);
    }
  };

  return (
    <Container style={{ paddingTop: "20px" }}>
      <Card className="mb-4">
        <Card.Body>
          <h2 className="text-center mb-4">Kitap Ara</h2>
          <Form onSubmit={handleSearch}>
            <Form.Group controlId="formBasicQuery">
              <Form.Control
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
                placeholder="Kitap arama terimini girin"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Ara
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {books.length > 0 && (
        <ListGroup className="mb-4">
          {books.map((book, index) => (
            <ListGroup.Item key={index}>
              <h5>{book.volumeInfo.title}</h5>
              <p>Yazar: {book.volumeInfo.authors?.join(", ")}</p>
              <p>ISBN: {book.volumeInfo.industryIdentifiers[0]?.identifier}</p>
              <Button
                onClick={() => handleBookAdd(book)}
                className="mt-2"
                variant="success"
              >
                Add
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {saveStatus && (
        <Alert
          variant="success"
          onClose={() => setSaveStatus(false)}
          dismissible
        >
          Kitap başarıyla eklendi!
        </Alert>
      )}
    </Container>
  );
};

export default AddBook;
