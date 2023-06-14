import React from "react";
import styles form "./decision.modules.scss";

export default function Decision() {
  return (
    <div className={styles.interface}>
    <h1>Interface de création d'une demande de décision</h1>
    <p className="intro">Soyez la plus précis dans votre idée, les détails sont les bienvenus !!!</p>
    <form>
        <label className="Title"> Titre de ta décision :
            <input type="text"/>
        </label>
        <label className="details"> Titre de ta décision :
            <textarea/>
        </label>
    </form>
    </div>
  )
}