import React, { useState, useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { add, formatISO } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import styles from "./CreatePage.module.scss";
import Button from "./Button";
import { toast } from "react-toastify";

export default function CreatePage() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [demand, setDemand] = useState([]);
  const { user } = useUser();
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

  const toastOptions = {
    position: "top-center",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
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
    data.UserId = user.Id;


    if (id) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/demands/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          console.info("Update done");
          navigate(-1);
        })
        .catch((error) => {
          console.error(error);
          toast.error(
            "Un problème à eu lieu lors de la mise à jour",
            toastOptions
          );
        });
    } else {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/demands/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          console.info("Created demand");
          navigate(-1);
        })
        .catch((error) => {
          console.error(error);
          toast.error(
            "Un problème à eu lieu lors de la création",
            toastOptions
          );
        });
    }
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
  console.info(demand.Title);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      Title: demand.Title,
      Benefice: demand.Benefice,
      Inconvenience: demand.Inconvenience,
      Deadline: demand.Deadline,
    },
  });
  return (
    <main>
      <h1 className={styles.banniere}>
        Interface de {id ? "modification" : "création"} d'une demande de
        décision
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input
            {...register("Title")}
            className={styles.title}
            type="text"
            name="Title"
            placeholder="Titre de ta décision"
            required
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
          />
          <textarea
            {...register("Inconvenience")}
            type="text"
            name="Inconvenience"
            placeholder="Et les risques ?"
            required
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
