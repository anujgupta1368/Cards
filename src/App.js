import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Easy } from "./screens/Easy";
import { Medium } from "./screens/Medium";
import { Hard } from "./screens/Hard";

export const App = () => {
  return (
    <Router>
      <div className="nav-container">
        <nav>
          <ul>
            <li><Link to="/">Easy</Link></li>
            <li><Link to="/medium">Medium</Link></li>
            <li><Link to="/hard">Hard</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Easy />} />
          <Route path="/medium" element={<Medium />} />
          <Route path="/hard" element={<Hard />} />
        </Routes>
      </div>
    </Router>
  )
}