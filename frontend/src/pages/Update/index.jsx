import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];
  // use location will give us pathname and we will split it and get the id
  // console.log(location.pathname.split("/")[2]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/books/" + bookId, book);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(book);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-2xl my-10">Update the Book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
        className="outline p-2 rounded"
      />
      <input
        type="text"
        placeholder="desc"
        onChange={handleChange}
        name="desc"
        className="outline p-2 rounded"
      />
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
        className="outline p-2 rounded"
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
        className="outline p-2 rounded"
      />
      <button onClick={handleClick} className="outline p-2 rounded">
        Update
      </button>
    </div>
  );
};

export default Update;
