import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import VotePage from "./components/VotePage";
import DisagreementPage from "./components/DisagreementPage";
import ValidPage from "./components/ValidPage";
import EstablishmentPage from "./components/EstablishmentPage";
import ArchivePage from "./components/ArchivePage";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/Menu" element={<Menu />} />
          <Route path="/VotePage" element={<VotePage />} />
          <Route path="/DisagreementPage" element={<DisagreementPage />} />
          <Route path="/ValidPage" element={<ValidPage />} />
          <Route path="/EstablishmentPage" element={<EstablishmentPage />} />
          <Route path="/ArchivePage" element={<ArchivePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
