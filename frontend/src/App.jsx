import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VotePage from "./components/VotePage";
import DisagreementPage from "./components/DisagreementPage";
import ValidPage from "./components/ValidPage";
import EstablishmentPage from "./components/EstablishmentPage";
import ArchivePage from "./components/ArchivePage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/VotePage" element={<VotePage />} />
          <Route path="/DisagreementPage" element={<DisagreementPage />} />
          <Route path="/ValidPage" element={<ValidPage />} />
          <Route path="/EstablishmentPage" element={<EstablishmentPage />} />
          <Route path="/ArchivePage" element={<ArchivePage />} />
        </Routes>
        <p>coucou</p>
      </div>
    </Router>
  );
}

export default App;
