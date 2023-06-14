import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Decision from "./components/Decision";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/CreatePage" element={<Decision />} />
        </Routes>
        <p>coucou</p>
      </div>
    </Router>
  );
}

export default App;
