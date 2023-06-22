import React, { useRef, useState, useCallback } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { add, formatISO } from "date-fns";
import styles from "./CreatePage.module.scss";
import Button from "./Button";

export default function CreatePage() {
  const [selectedValues, setSelectedValues] = useState([]);

  const addValue = useCallback((value) => {
    setSelectedValues((prevSelectedValues) => [...prevSelectedValues, value]);
  }, []);

  const removeValue = useCallback((value) => {
    setSelectedValues((prevSelectedValues) =>
      prevSelectedValues.filter((v) => v !== value)
    );
  }, []);
  const defaultDate = formatISO(add(new Date(), { months: 1 }), {
    representation: "date",
  });
  const maxDate = formatISO(add(new Date(), { years: 1 }), {
    representation: "date",
  });
  const minDate = formatISO(add(new Date(), { days: 7 }), {
    representation: "date",
  });

  const editorRef = useRef(null);
  const editorConfig = {
    plugins: "lists",
    height: 300,
    toolbar: [
      { name: "history", items: ["undo", "redo"] },
      {
        name: "formatting",
        items: ["bold", "italic", "underline"],
      },
      {
        name: "alignment",
        items: ["alignleft", "aligncenter", "alignright", "alignjustify"],
      },

      {
        name: "indentation",
        items: ["bullist", "numlist", "outdent", "indent"],
      },
    ],
    color_cols: 5,
    menubar: false,
  };
  return (
    <main>
      <h1>Interface de création d'une demande de décision</h1>
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
            onInit={(editor) => {
              editorRef.current = editor;
            }}
            initialValue="<p>Donnez nous des détails sur votre idée !!!</p>"
            init={editorConfig}
          />
        </div>
        <p className={styles.label}>Bénéfices :</p>
        <div className={styles.editor}>
          <Editor
            onInit={(editor) => {
              editorRef.current = editor;
            }}
            initialValue="<p>Quel en seront les bénéfices ?</p>"
            init={editorConfig}
          />
        </div>
        <p className={styles.label}>Risques :</p>
        <div className={styles.editor}>
          <Editor
            onInit={(editor) => {
              editorRef.current = editor;
            }}
            initialValue="<p>Et les risques ?</p>"
            init={editorConfig}
          />
        </div>
        <p className={styles.label}>Service(s) impactés</p>
        <div className={styles.buttonServ}>
          <Button addValue={addValue} removeValue={removeValue}>
            Administration
          </Button>
          <Button addValue={addValue} removeValue={removeValue}>
            Bénévoles
          </Button>
          <Button addValue={addValue} removeValue={removeValue}>
            Comptabilité
          </Button>
          <Button addValue={addValue} removeValue={removeValue}>
            Développement
          </Button>
          <Button addValue={addValue} removeValue={removeValue}>
            Technique
          </Button>
        </div>
        <p className={styles.label}>Choix :</p>
        <div className={styles.buttonServ} id="selectedValue">
          {selectedValues.map((value) => (
            <button className={styles.buttonChoice} type="button" key={value}>
              {value}
            </button>
          ))}
        </div>
        <label className={styles.date}>
          Date de fin souhaitée :
          <input
            type="date"
            name="date"
            defaultValue={defaultDate}
            min={minDate}
            max={maxDate}
          />
        </label>
        <button className={styles.btnSubmit} type="submit">
          Je propose mon idée !
        </button>
      </form>
    </main>
  );
}
