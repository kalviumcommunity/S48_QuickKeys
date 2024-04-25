import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingpage';
import AddEntity from './components/addentity'; // Import AddEntity component

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/shortcuts" element={<AddEntity />} /> {/* Add this route */}
    </Routes>
  );
}

export default App;
