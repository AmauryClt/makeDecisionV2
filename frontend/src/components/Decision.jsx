import styles from "./decision.module.scss";

export default function Decision() {
  return (
    <div>
      <h1>Interface de création d'une demande de décision</h1>
      <p className={styles.intro}>
        Soyez le plus précis dans votre idée, les détails sont les bienvenus !!!
      </p>
      <form>
        <label className={styles.title}>
          <input type="text" name="title" placeholder="Titre de ta décision" />
        </label>
        <label>
          <textarea
            name="details"
            placeholder="Donne nous quelques détails..."
          />
        </label>
        <label>
          <textarea
            name="benefices"
            placeholder="Quel seront les bénéfices ?"
          />
        </label>
        <label>
          <textarea name="risques" placeholder="Quels seront les risques ?" />
        </label>
        <label>
          Service(s) impactés
          <em>Utilisez la touche ctrl pour une sélection multiple</em>
          <select name="service" multiple>
            <option>Administration</option>
            <option>Bénévoles</option>
            <option>Comptabilité</option>
            <option>Développement</option>
            <option>Technique</option>
          </select>
        </label>
        <button type="submit">Je propose mon idée !</button>
      </form>
    </div>
  );
}
