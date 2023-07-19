import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { add, formatISO } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CreatePage.module.scss";
import Button from "./Button";

export default function CreatePage({ setIsUpdated }) {
  const { register, handleSubmit, control } = useForm();
  const [selectedValues, setSelectedValues] = useState([]);
  const [demand, setDemand] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const defaultDate = formatISO(add(new Date(), { months: 1 }), {
    representation: "date",
  });
  const maxDate = formatISO(add(new Date(), { years: 1 }), {
    representation: "date",
  });
  const minDate = formatISO(add(new Date(), { days: 7 }), {
    representation: "date",
  });
  let formattedDate = defaultDate;
  const serviceValues = {
    ADMINISTRATIF: "1",
    COMPTABILITE: "2",
    MARKETING: "3",
    "RESSOURCES HUMAINES": "4",
    COMMERCIAL: "5",
  };
  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/demands/${id}`)
        .then((response) => response.json())
        .then((data) => {
          const dateStr = data.Deadline;
          formattedDate = formatISO(new Date(dateStr), {
            representation: "date",
          });
          data.Deadline = formattedDate;
          setDemand(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const onSubmit = (data) => {
    const serviceImpactValues = selectedValues.map(
      (value) => serviceValues[value]
    );
    data.ServicesIds = serviceImpactValues;

    if (id) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/demands/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          console.info(result);
          setSelectedValues(result);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/demands/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          console.info(result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setIsUpdated((old) => !old);
    console.info(setIsUpdated);
    navigate(window.history.back());
  };

  const addValue = useCallback((value) => {
    setSelectedValues((prevSelectedValues) => [...prevSelectedValues, value]);
  }, []);

  const removeValue = useCallback((value) => {
    setSelectedValues((prevSelectedValues) =>
      prevSelectedValues.filter((v) => v !== value)
    );
  }, []);

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
    menubar: false,
    placeholder: "Expliquez ici en détail votre idée.",
  };

  return (
    <main>
      <h1 className={styles.banniere}>
        Interface de {id ? "modification" : "création"} d'une demande de
        décision
      </h1>
      <p className={styles.intro}>
        Soyez le plus précis dans votre idée, les détails sont les bienvenus !!!
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input
            {...register("Title")}
            className={styles.title}
            type="text"
            name="Title"
            placeholder="Titre de ta décision"
            required
            defaultValue={demand.Title}
          />
        </label>
        <div className={styles.editor}>
          <Controller
            {...demand.Content}
            control={control}
            name="Content"
            render={({ field: { onChange, onBlur, ref } }) => (
              <Editor
                {...demand.Content}
                onBlur={onBlur}
                onEditorChange={onChange}
                initialValue={id ? demand.Content : undefined}
                init={editorConfig}
                onInit={(evt, editor) => (ref.current = editor)}
              />
            )}
          />
        </div>
        <div className={styles.benefInc}>
          <textarea
            {...register("Benefice")}
            type="text"
            name="Benefice"
            placeholder="Quel en seront les bénéfices ?"
            required
            defaultValue={demand.Benefice}
          />
          <textarea
            {...register("Inconvenience")}
            type="text"
            name="Inconvenience"
            placeholder="Et les risques ?"
            required
            defaultValue={demand.Inconvenience}
          />
        </div>
        <p className={styles.label}>Service(s) impactés</p>
        <div className={styles.buttonServ}>
          <Button
            addValue={addValue}
            removeValue={removeValue}
            value={serviceValues.ADMINISTRATIF}
          >
            ADMINISTRATIF
          </Button>
          <Button
            addValue={addValue}
            removeValue={removeValue}
            value={serviceValues.COMPTABILITE}
          >
            COMPTABILITE
          </Button>
          <Button
            addValue={addValue}
            removeValue={removeValue}
            value={serviceValues.MARKETING}
          >
            MARKETING
          </Button>
          <Button
            addValue={addValue}
            removeValue={removeValue}
            value={serviceValues["RESSOURCES HUMAINES"]}
          >
            RESSOURCES HUMAINES
          </Button>
          <Button
            addValue={addValue}
            removeValue={removeValue}
            value={serviceValues.ADMINISTRATIF}
          >
            COMMERCIAL
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
            {...register("Deadline")}
            type="date"
            name="Deadline"
            placeholder={defaultDate}
            defaultValue={demand.Deadline}
            min={minDate}
            max={maxDate}
            className={styles.inputDate}
            required
          />
        </label>
        <button className={styles.btnSubmit} type="submit">
          Je propose mon idée !
        </button>
      </form>
    </main>
  );
}

CreatePage.propTypes = {
  setIsUpdated: PropTypes.func.isRequired,
};
