import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "./decision.module.scss";

export default function Decision() {
  const [selectedValues, setSelectedValues] = useState([]);

  function addValue(value) {
    if (!selectedValues.includes(value)) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    }
  }

  const editorRef = useRef(null);

  return (
    <main>
      <h1 className={styles.banniere}>Interface de création d'une demande de décision</h1>
      <p className={styles.intro}>
        Soyez le plus précis dans votre idée, les détails sont les bienvenus !!!
      </p>
      <form>
        <label className={styles.title}>
          <input type="text" name="title" placeholder="Titre de ta décision" />
        </label>
        <p className={styles.label}>Détails :</p>
        <div className={styles.editor}>
          <Editor
            onInit={(evt, editor) => {
              editorRef.current = editor;
            }}
            initialValue="<p>Donnez nous des détails sur votre idée !!!</p>"
            init={{
              plugins: "lists",
              height: 300,
              toolbar: [
                { name: "history", items: ["undo", "redo"] },
                {
                  name: "formatting",
                  items: [
                    "bold",
                    "italic",
                    "forecolor",
                    "backcolor",
                    "fontsizeinput",
                  ],
                },
                {
                  name: "alignment",
                  items: [
                    "alignleft",
                    "aligncenter",
                    "alignright",
                    "alignjustify",
                  ],
                },

                {
                  name: "indentation",
                  items: ["bullist", "numlist", "outdent", "indent"],
                },
              ],
              color_cols: 5,
              menubar: true,
            }}
          />
        </div>
        <p className={styles.label}>Bénéfices :</p>
        <div className={styles.editor}>
          <Editor
            onInit={(evt, editor) => {
              editorRef.current = editor;
            }}
            initialValue="<p>Quel en seront les bénéfices ?</p>"
            init={{
              plugins: "lists",
              height: 300,
              toolbar: [
                { name: "history", items: ["undo", "redo"] },
                {
                  name: "formatting",
                  items: [
                    "bold",
                    "italic",
                    "forecolor",
                    "backcolor",
                    "fontsizeinput",
                  ],
                },
                {
                  name: "alignment",
                  items: [
                    "alignleft",
                    "aligncenter",
                    "alignright",
                    "alignjustify",
                  ],
                },

                {
                  name: "indentation",
                  items: ["bullist", "numlist", "outdent", "indent"],
                },
              ],
              color_cols: 5,
              menubar: true,
            }}
          />
        </div>
        <p className={styles.label}>Risques :</p>
        <div className={styles.editor}>
          <Editor
            onInit={(evt, editor) => {
              editorRef.current = editor;
            }}
            initialValue="<p>Et les risques ?</p>"
            init={{
              plugins: "lists",
              height: 300,
              toolbar: [
                { name: "history", items: ["undo", "redo"] },
                {
                  name: "formatting",
                  items: [
                    "bold",
                    "italic",
                    "forecolor",
                    "backcolor",
                    "fontsizeinput",
                  ],
                },
                {
                  name: "alignment",
                  items: [
                    "alignleft",
                    "aligncenter",
                    "alignright",
                    "alignjustify",
                  ],
                },

                {
                  name: "indentation",
                  items: ["bullist", "numlist", "outdent", "indent"],
                },
              ],
              color_cols: 5,
              menubar: true,
            }}
          />
        </div>
        <p className={styles.label}>Service(s) impactés</p>
        <div className={styles.buttonServ}>
          <button type="button" onClick={() => addValue("Administration")}>
            Administration
          </button>
          <button type="button" onClick={() => addValue("Bénévoles")}>
            Bénévoles
          </button>
          <button type="button" onClick={() => addValue("Comptabilité")}>
            Comptabilité
          </button>
          <button type="button" onClick={() => addValue("Développement")}>
            Développement
          </button>
          <button type="button" onClick={() => addValue("Technique")}>
            Technique
          </button>
        </div>
        <p className={styles.label}>Choix :</p>
        <ul id="selectedValue">
          {selectedValues.map((value) => (
            <li key={value.id}>{value}</li>
          ))}
        </ul>
        <label className={styles.date}>
          Date de fin souhaitée :
          <input type="date" name="date" />
        </label>
        <button type="submit">Je propose mon idée !</button>
      </form>
    </main>
  );
}
