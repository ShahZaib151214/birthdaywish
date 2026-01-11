import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import Memories from "./components/Memories";
import Cake from "./components/Cake";
import Letter from "./components/Letter";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/birthdaywish" element={<Landing />} />
          <Route path="/birthdaywish/landing" element={<Landing />} />
          <Route path="/birthdaywish/memories" element={<Memories />} />
          <Route path="/birthdaywish/cake" element={<Cake />} />
          <Route path="/birthdaywish/letter" element={<Letter />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
