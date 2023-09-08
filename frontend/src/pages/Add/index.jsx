import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
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
      <h1 className="font-bold text-2xl my-10">Add New Book</h1>
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
        Add
      </button>
    </div>
  );
};

export default Add;
