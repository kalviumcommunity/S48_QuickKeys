import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingpage';
import AddEntity from './components/addentity';
import UpdateEntity from './components/UpdateEntity'; // Import the UpdateEntity component

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/shortcuts" element={<AddEntity />} />
      <Route path="/updateentity/:id" element={<UpdateEntity />} /> {/* Add this route */}
    </Routes>
  );
}

export default App;
