import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "./decision.module.scss";

export default function Decision() {
  const editorRef = useRef(null);

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
        Risques :
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
