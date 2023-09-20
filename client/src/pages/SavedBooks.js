import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import { removeBookId } from "../utils/localStorage";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Auth from "../utils/auth";

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);
  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeBook({
        variables: { bookId },
      });

      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  //   return (
  //     <>
  //       <div fluid className="text-light bg-dark p-5">
  //         <Container>
  //           <h1>Viewing saved books!</h1>
  //         </Container>
  //       </div>
  //       <Container>
  //         <h2 className="pt-5">
  //           {userData.savedBooks.length
  //             ? `Viewing ${userData.savedBooks.length} saved ${
  //                 userData.savedBooks.length === 1 ? "book" : "books"
  //               }:`
  //             : "You have no saved books!"}
  //         </h2>
  //         <Row>
  //           {userData.savedBooks.map((book) => {
  //             return (
  //               <Col md="4">
  //                 <Card key={book.bookId} border="dark">
  //                   {book.image ? (
  //                     <Card.Img
  //                       src={book.image}
  //                       alt={`The cover for ${book.title}`}
  //                       variant="top"
  //                     />
  //                   ) : null}
  //                   <Card.Body>
  //                     <Card.Title>{book.title}</Card.Title>
  //                     <p className="small">Authors: {book.authors}</p>
  //                     <Card.Text>{book.description}</Card.Text>
  //                     <Button
  //                       className="btn-block btn-danger"
  //                       onClick={() => handleDeleteBook(book.bookId)}
  //                     >
  //                       Delete this Book!
  //                     </Button>
  //                   </Card.Body>
  //                 </Card>
  //               </Col>
  //             );
  //           })}
  //         </Row>
  //       </Container>
  //     </>
  //   );
  // };

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </div>
        {userData.savedBooks.map((book) => {
          return (
            <div key={book.bookId} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h3 className="card-header bg-primary text-light p-2 m-0">
                  {book.title} <br />
                  {book.authors.length
                    ? `Written by ${book.authors.join(", ")}`
                    : ""}
                </h3>
                <div className="card-body bg-light p-2">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="card-img-top"
                    />
                  ) : null}
                  <p className="card-text">{book.description}</p>
                  <div>
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      More Information on Google Books
                    </a>
                  </div>
                  <button
                    className="btn btn-danger btn-block mt-2"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default SavedBooks;
