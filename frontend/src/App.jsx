import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books/index.jsx";
import Add from "./pages/Add/index.jsx";
import Update from "./pages/Update/index.jsx";

function App() {
  return (
    <div className=" px-[100px] flex items-center justify-center text-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
