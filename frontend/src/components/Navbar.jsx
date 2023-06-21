import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav-links">
      <div className="Liens">
        <Link className="créer" to="/créertadécision">
          Créer ta décision
        </Link>
        <Link className="en-cours" to="/encoursdevote">
          En cours de vote
        </Link>
        <Link className="terminé" to="/votationterminé">
          Votation terminé
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
