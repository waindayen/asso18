import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Mission from './pages/Mission';
import Projects from './pages/Projects';
import Action from './pages/Action';
import Contact from './pages/Contact';
import Donation from './pages/Donation';
import Sponsorship from './pages/Sponsorship';
import Volunteer from './pages/Volunteer';
import Partnership from './pages/Partnership';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/projets" element={<Projects />} />
        <Route path="/agir" element={<Action />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faire-un-don" element={<Donation />} />
        <Route path="/parrainage" element={<Sponsorship />} />
        <Route path="/benevolat" element={<Volunteer />} />
        <Route path="/partenariat" element={<Partnership />} />
      </Routes>
    </div>
  );
}

export default App;