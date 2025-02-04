import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/HomePage/HomePage.jsx';
import ProblemTable from './components/ProblemTable/ProblemTable.jsx' // Assuming this is where ProblemTable is

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/problems" element={<ProblemTable />} />
        {/* Other routes here */}
      </Routes>
    </Router>
  );
}

export default App;