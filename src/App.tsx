import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Create from "./components/client/Create";
import EditClient from "./components/client/Edit";

const App: React.FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create Client</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<EditClient />} />
      </Routes>
    </div>
  );
};

export default App;
