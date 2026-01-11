import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './components/Landing';
import Memories from './components/Memories';
import Cake from './components/Cake';
import Letter from './components/Letter';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/cake" element={<Cake />} />
          <Route path="/letter" element={<Letter />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
