import { useState } from "react";

import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CardList from "./pages/ViewAllCards";
import AddCard from "./pages/AddCard";
import CardDetails from "./pages/CardDetails";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/view-all-cards" element={<CardList />} />
        <Route path="/add-new-card" element={<AddCard />} />
        <Route path="/card/:id" element={<CardDetails />} />
      </Routes>
    </Router>
  );
}

export default App;