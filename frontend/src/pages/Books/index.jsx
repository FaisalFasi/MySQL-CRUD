import React from "react";
import { useState } from "react";
import { useEffect } from "react";

// axios is a library that helps us make http requests to external resources.
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");

        setBooks(res.data);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllBooks();
  }, []);
  return (
    <div className=" p-8  ">
      <h1>FR Book Shop</h1>
      <div className="flex flex-wrap  gap-12 my-20">
        {books.map((book) => {
          return (
            <div
              key={book.id}
              className="flex flex-col items-center flex-1 gap-4"
            >
              {book?.cover && (
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-[200px] h-[300px] object-cover bg-blue-400"
                />
              )}
              <h2 className="font-bold font-14">{book.title}</h2>
              <p>{book.desc}</p>
              <span>{book.price}</span>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-gray-400 p-2 w-20 text-white rounded"
              >
                delete
              </button>
              <button className="bg-gray-400 p-2 w-20 text-white rounded">
                <Link to={`/update/${book.id}`}>update</Link>
              </button>
            </div>
          );
        })}
      </div>
      <button className="bg-gray-400 p-2">
        <Link to={"/add"}>Add new book</Link>
      </button>
    </div>
  );
};

export default Books;
